"use client";

import { useEffect, useReducer } from "react";
import type { OrderRepository } from "@/data/orderRepository";
import { reassignCategory } from "@/domain/calc";
import {
  OTHER_CATEGORY,
  type BarterEntry,
  type BarterEntryDraft,
  type ItemDraft,
  type Installment,
  type InstallmentDraft,
  type Order,
  type OrderItem,
} from "@/domain/types";

type Action =
  | { type: "add"; item: OrderItem }
  | { type: "update"; id: string; draft: ItemDraft }
  | { type: "remove"; id: string }
  | { type: "addCategory"; name: string }
  | { type: "renameCategory"; from: string; to: string }
  | { type: "deleteCategory"; name: string }
  | { type: "addInstallment"; installment: Installment }
  | { type: "updateInstallment"; id: string; draft: InstallmentDraft }
  | { type: "removeInstallment"; id: string }
  | { type: "addBarterEntry"; entry: BarterEntry }
  | { type: "updateBarterEntry"; id: string; draft: BarterEntryDraft }
  | { type: "removeBarterEntry"; id: string };

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
    case "addInstallment":
      return { ...order, installments: [...order.installments, action.installment] };
    case "updateInstallment":
      return {
        ...order,
        installments: order.installments.map((installment) =>
          installment.id === action.id
            ? { ...action.draft, id: action.id }
            : installment,
        ),
      };
    case "removeInstallment":
      return {
        ...order,
        installments: order.installments.filter(
          (installment) => installment.id !== action.id,
        ),
      };
    case "addBarterEntry":
      return { ...order, barterEntries: [...order.barterEntries, action.entry] };
    case "updateBarterEntry":
      return {
        ...order,
        barterEntries: order.barterEntries.map((entry) =>
          entry.id === action.id ? { ...action.draft, id: action.id } : entry,
        ),
      };
    case "removeBarterEntry":
      return {
        ...order,
        barterEntries: order.barterEntries.filter((entry) => entry.id !== action.id),
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

  function addCategory(name: string) {
    dispatch({ type: "addCategory", name });
  }

  function renameCategory(from: string, to: string) {
    dispatch({ type: "renameCategory", from, to });
  }

  function deleteCategory(name: string) {
    dispatch({ type: "deleteCategory", name });
  }

  function addInstallment(draft: InstallmentDraft) {
    dispatch({ type: "addInstallment", installment: { ...draft, id: crypto.randomUUID() } });
  }

  function updateInstallment(id: string, draft: InstallmentDraft) {
    dispatch({ type: "updateInstallment", id, draft });
  }

  function removeInstallment(id: string) {
    dispatch({ type: "removeInstallment", id });
  }

  function addBarterEntry(draft: BarterEntryDraft) {
    dispatch({ type: "addBarterEntry", entry: { ...draft, id: crypto.randomUUID() } });
  }

  function updateBarterEntry(id: string, draft: BarterEntryDraft) {
    dispatch({ type: "updateBarterEntry", id, draft });
  }

  function removeBarterEntry(id: string) {
    dispatch({ type: "removeBarterEntry", id });
  }

  return {
    order,
    addItem,
    updateItem,
    removeItem,
    addCategory,
    renameCategory,
    deleteCategory,
    addInstallment,
    updateInstallment,
    removeInstallment,
    addBarterEntry,
    updateBarterEntry,
    removeBarterEntry,
  };
}
