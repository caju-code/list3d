"use client";

import { useEffect, useReducer } from "react";
import type { OrderRepository } from "@/data/orderRepository";
import { reassignCategory } from "@/domain/calc";
import { OTHER_CATEGORY, type ItemDraft, type Order, type OrderItem } from "@/domain/types";

type Action =
  | { type: "add"; item: OrderItem }
  | { type: "update"; id: string; draft: ItemDraft }
  | { type: "remove"; id: string }
  | { type: "addCategory"; name: string }
  | { type: "renameCategory"; from: string; to: string }
  | { type: "deleteCategory"; name: string };

function reducer(order: Order, action: Action): Order {
  switch (action.type) {
    case "add":
      return { ...order, items: [...order.items, action.item] };
    case "update":
      return {
        ...order,
        items: order.items.map((item) =>
          item.id === action.id ? { ...action.draft, id: action.id } : item,
        ),
      };
    case "remove":
      return {
        ...order,
        items: order.items.filter((item) => item.id !== action.id),
      };
    case "addCategory":
      if (order.categories.includes(action.name)) return order;
      return { ...order, categories: [...order.categories, action.name] };
    case "renameCategory": {
      if (action.from === OTHER_CATEGORY || !order.categories.includes(action.from)) {
        return order;
      }
      return {
        ...order,
        categories: order.categories.map((category) =>
          category === action.from ? action.to : category,
        ),
        items: reassignCategory(order.items, action.from, action.to),
      };
    }
    case "deleteCategory": {
      if (action.name === OTHER_CATEGORY || !order.categories.includes(action.name)) {
        return order;
      }
      return {
        ...order,
        categories: order.categories.filter((category) => category !== action.name),
        items: reassignCategory(order.items, action.name, OTHER_CATEGORY),
      };
    }
    default:
      return order;
  }
}

export function useOrder(repository: OrderRepository) {
  const [order, dispatch] = useReducer(reducer, undefined, () => repository.load());

  useEffect(() => {
    repository.save(order);
  }, [order, repository]);

  function addItem(draft: ItemDraft) {
    dispatch({ type: "add", item: { ...draft, id: crypto.randomUUID() } });
  }

  function updateItem(id: string, draft: ItemDraft) {
    dispatch({ type: "update", id, draft });
  }

  function removeItem(id: string) {
    dispatch({ type: "remove", id });
  }

  function addCategory(name: string) {
    dispatch({ type: "addCategory", name });
  }

  function renameCategory(from: string, to: string) {
    dispatch({ type: "renameCategory", from, to });
  }

  function deleteCategory(name: string) {
    dispatch({ type: "deleteCategory", name });
  }

  return {
    order,
    addItem,
    updateItem,
    removeItem,
    addCategory,
    renameCategory,
    deleteCategory,
  };
}
