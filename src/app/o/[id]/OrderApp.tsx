"use client";

import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { OrderSummary } from "@/components/OrderSummary";
import { CategoryManager } from "@/components/CategoryManager";
import { ItemForm } from "@/components/ItemForm";
import { ItemList } from "@/components/ItemList";
import { FinancialSummary } from "@/components/FinancialSummary";
import { BarterEntryManager } from "@/components/BarterEntryManager";
import { InstallmentManager } from "@/components/InstallmentManager";
import { createOrderRepository } from "@/data/orderRepository";
import {
  deliveredItemCount,
  deliveredValue,
  grossTotal,
  itemCount,
} from "@/domain/calc";
import type { Order, OrderItem } from "@/domain/types";
import { useOrder } from "@/state/useOrder";

export function OrderApp({ id, initialOrder }: { id: string; initialOrder: Order }) {
  const {
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
  } = useOrder(createOrderRepository(id, initialOrder));
  const [editingItem, setEditingItem] = useState<OrderItem | null>(null);

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
      <AppHeader orderId={id} />

      <OrderSummary
        grossTotalCents={grossTotal(order.items)}
        deliveredValueCents={deliveredValue(order.items)}
        itemCount={itemCount(order.items)}
        deliveredItemCount={deliveredItemCount(order.items)}
      />

      <CategoryManager
        categories={order.categories}
        onAdd={addCategory}
        onRename={renameCategory}
        onDelete={deleteCategory}
      />

      <ItemForm
        key={editingItem?.id ?? "new"}
        editingItem={editingItem}
        categories={order.categories}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingItem(null)}
      />

      <ItemList items={order.items} onEdit={setEditingItem} onDelete={handleDelete} />

      <FinancialSummary
        items={order.items}
        barterEntries={order.barterEntries}
        installments={order.installments}
      />

      <BarterEntryManager
        entries={order.barterEntries}
        onAdd={addBarterEntry}
        onUpdate={updateBarterEntry}
        onDelete={removeBarterEntry}
      />

      <InstallmentManager
        installments={order.installments}
        onAdd={addInstallment}
        onUpdate={updateInstallment}
        onDelete={removeInstallment}
      />

      <AppFooter />
    </div>
  );
}
