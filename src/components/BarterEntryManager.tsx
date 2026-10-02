"use client";

import { useState } from "react";
import { t } from "@/i18n/en";
import { formatBRL } from "@/domain/money";
import type { BarterEntry, BarterEntryDraft } from "@/domain/types";
import { BarterEntryForm } from "./BarterEntryForm";
import { BarterTypeBadge } from "./BarterTypeBadge";

interface BarterEntryManagerProps {
  entries: BarterEntry[];
  onAdd: (draft: BarterEntryDraft) => void;
  onUpdate: (id: string, draft: BarterEntryDraft) => void;
  onDelete: (id: string) => void;
}

export function BarterEntryManager({
  entries,
  onAdd,
  onUpdate,
  onDelete,
}: BarterEntryManagerProps) {
  const [open, setOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<BarterEntry | null>(null);

  function handleSubmit(draft: BarterEntryDraft) {
    if (editingEntry) {
      onUpdate(editingEntry.id, draft);
      setEditingEntry(null);
    } else {
      onAdd(draft);
    }
  }

  function handleDelete(id: string) {
    if (editingEntry?.id === id) setEditingEntry(null);
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
        {t.barter.manage}
        <span aria-hidden="true" className="text-neutral-400">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-4 border-t border-neutral-100 p-4">
          <BarterEntryForm
            key={editingEntry?.id ?? "new"}
            editingEntry={editingEntry}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingEntry(null)}
          />

          {entries.length === 0 ? (
            <p className="text-sm text-neutral-500">{t.barter.empty}</p>
          ) : (
            <ul>
              {entries.map((entry) => (
                <BarterEntryRow
                  key={entry.id}
                  entry={entry}
                  onEdit={setEditingEntry}
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

function BarterEntryRow({
  entry,
  onEdit,
  onDelete,
}: {
  entry: BarterEntry;
  onEdit: (entry: BarterEntry) => void;
  onDelete: (id: string) => void;
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <li className="flex flex-col gap-2 border-t border-neutral-100 py-3 first:border-t-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-900">{entry.description}</p>
          {(entry.date || entry.note) && (
            <p className="text-xs text-neutral-500">
              {[entry.date, entry.note].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-sm font-semibold text-neutral-900">
            {formatBRL(entry.amountCents)}
          </p>
          <BarterTypeBadge type={entry.type} />
        </div>
      </div>

      {confirmingDelete ? (
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-neutral-600">{t.barter.confirmDelete}</span>
          <button
            type="button"
            onClick={() => onDelete(entry.id)}
            className="font-medium text-accent-filament"
          >
            {t.barter.confirmDeleteYes}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            className="font-medium text-neutral-500"
          >
            {t.barter.confirmDeleteNo}
          </button>
        </div>
      ) : (
        <div className="flex justify-end gap-4 text-sm">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            className="font-medium text-neutral-600"
          >
            {t.barter.edit}
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="font-medium text-accent-filament"
          >
            {t.barter.delete}
          </button>
        </div>
      )}
    </li>
  );
}
