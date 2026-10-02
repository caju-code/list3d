"use client";

import { useState } from "react";
import { t } from "@/i18n/en";
import { itemSubtotal } from "@/domain/calc";
import { formatBRL } from "@/domain/money";
import type { OrderItem } from "@/domain/types";
import { StatusBadge } from "./StatusBadge";

interface ItemRowProps {
  item: OrderItem;
  onEdit: (item: OrderItem) => void;
  onDelete: (id: string) => void;
}

export function ItemRow({ item, onEdit, onDelete }: ItemRowProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <li className="flex flex-col gap-2 border-t border-zinc-200 py-3 first:border-t-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-zinc-900">{item.name}</p>
          <p className="font-mono text-xs text-zinc-500">
            {item.quantity}× {formatBRL(item.unitPriceCents)}/un
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <p className="font-mono text-sm font-semibold text-zinc-900">
            {formatBRL(itemSubtotal(item))}
          </p>
          <StatusBadge status={item.status} />
        </div>
      </div>

      {confirmingDelete ? (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-zinc-600">{t.list.confirmDelete}</span>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="font-medium text-red-600"
          >
            {t.list.confirmDeleteYes}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            className="font-medium text-zinc-500"
          >
            {t.list.confirmDeleteNo}
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-4 text-sm">
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="font-medium text-zinc-600"
          >
            {t.list.edit}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="font-medium text-red-600"
          >
            {t.list.delete}
          </button>
        </div>
      )}
    </li>
  );
}
