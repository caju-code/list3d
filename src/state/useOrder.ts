"use client";

import { useEffect, useReducer } from "react";
import type { OrderRepository } from "@/data/orderRepository";
import type { ItemDraft, Order, OrderItem } from "@/domain/types";

type Action =
  | { type: "add"; item: OrderItem }
  | { type: "update"; id: string; draft: ItemDraft }
  | { type: "remove"; id: string };

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

  return { order, addItem, updateItem, removeItem };
}
