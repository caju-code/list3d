"use client";

import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { OrderSummary } from "@/components/OrderSummary";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { mockOrderRepository } from "@/data/orderRepository";
import {
  deliveredItemCount,
  deliveredValue,
  grossTotal,
  itemCount,
} from "@/domain/calc";
import type { OrderItem } from "@/domain/types";
import { useOrder } from "@/state/useOrder";

export default function Home() {
  const { order, addItem, updateItem, removeItem } = useOrder(mockOrderRepository);
  const [editingItem, setEditingItem] = useState<OrderItem | null>(null);

  const categories = Array.from(new Set(order.items.map((item) => item.category)));

  function handleSubmit(draft: Parameters<typeof addItem>[0]) {
    if (editingItem) {
      updateItem(editingItem.id, draft);
      setEditingItem(null);
    } else {
      addItem(draft);
    }
  }

  function handleDelete(id: string) {
    if (editingItem?.id === id) setEditingItem(null);
    removeItem(id);
  }

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-1 flex-col gap-6 px-4 py-6">
      <AppHeader />

      <OrderSummary
        grossTotalCents={grossTotal(order.items)}
        deliveredValueCents={deliveredValue(order.items)}
        itemCount={itemCount(order.items)}
        deliveredItemCount={deliveredItemCount(order.items)}
      />

      <ItemForm
        key={editingItem?.id ?? "new"}
        editingItem={editingItem}
        categories={categories}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingItem(null)}
      />

      <ItemList items={order.items} onEdit={setEditingItem} onDelete={handleDelete} />
    </div>
  );
}
