"use client";

import { useState } from "react";
import { t } from "@/i18n/en";
import { formatBRL } from "@/domain/money";
import type { Installment, InstallmentDraft } from "@/domain/types";
import { InstallmentForm } from "./InstallmentForm";
import { InstallmentStatusBadge } from "./InstallmentStatusBadge";

interface InstallmentManagerProps {
  installments: Installment[];
  onAdd: (draft: InstallmentDraft) => void;
  onUpdate: (id: string, draft: InstallmentDraft) => void;
  onDelete: (id: string) => void;
}

export function InstallmentManager({
  installments,
  onAdd,
  onUpdate,
  onDelete,
}: InstallmentManagerProps) {
  const [open, setOpen] = useState(false);
  const [editingInstallment, setEditingInstallment] = useState<Installment | null>(null);

  function handleSubmit(draft: InstallmentDraft) {
    if (editingInstallment) {
      onUpdate(editingInstallment.id, draft);
      setEditingInstallment(null);
    } else {
      onAdd(draft);
    }
  }

  function handleDelete(id: string) {
    if (editingInstallment?.id === id) setEditingInstallment(null);
    onDelete(id);
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-surface">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-700"
      >
        {t.installments.manage}
        <span aria-hidden="true" className="text-neutral-400">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-4 border-t border-neutral-100 p-4">
          <InstallmentForm
            key={editingInstallment?.id ?? "new"}
            editingInstallment={editingInstallment}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingInstallment(null)}
          />

          {installments.length === 0 ? (
            <p className="text-sm text-neutral-500">{t.installments.empty}</p>
          ) : (
            <ul>
              {installments.map((installment) => (
                <InstallmentRow
                  key={installment.id}
                  installment={installment}
                  onEdit={setEditingInstallment}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function InstallmentRow({
  installment,
  onEdit,
  onDelete,
}: {
  installment: Installment;
  onEdit: (installment: Installment) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <li className="flex flex-col gap-2 border-t border-neutral-100 py-3 first:border-t-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-900">{installment.description}</p>
          {(installment.date || installment.note) && (
            <p className="text-xs text-neutral-500">
              {[installment.date, installment.note].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-sm font-semibold text-neutral-900">
            {formatBRL(installment.amountCents)}
          </p>
          <InstallmentStatusBadge status={installment.status} />
        </div>
      </div>

      {confirmingDelete ? (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-neutral-600">{t.installments.confirmDelete}</span>
          <button
            type="button"
            onClick={() => onDelete(installment.id)}
            className="font-medium text-accent-filament"
          >
            {t.installments.confirmDeleteYes}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            className="font-medium text-neutral-500"
          >
            {t.installments.confirmDeleteNo}
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-4 text-sm">
          <button
            type="button"
            onClick={() => onEdit(installment)}
            className="font-medium text-neutral-600"
          >
            {t.installments.edit}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="font-medium text-accent-filament"
          >
            {t.installments.delete}
          </button>
        </div>
      )}
    </li>
  );
}
