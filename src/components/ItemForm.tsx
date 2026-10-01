"use client";

import { useId, useState } from "react";
import { t } from "@/i18n/en";
import { ITEM_STATUSES, OTHER_CATEGORY, type ItemDraft, type OrderItem } from "@/domain/types";
import { validateItemDraft, type RawItemDraft } from "@/domain/validation";

interface ItemFormProps {
  editingItem: OrderItem | null;
  categories: string[];
  onSubmit: (draft: ItemDraft) => void;
  onCancelEdit: () => void;
}

const EMPTY_FORM: RawItemDraft = {
  name: "",
  category: "",
  quantity: "1",
  unitPrice: "",
  status: "quoted",
};

function formFromItem(item: OrderItem | null): RawItemDraft {
  if (!item) return EMPTY_FORM;
  return {
    name: item.name,
    category: item.category,
    quantity: String(item.quantity),
    unitPrice: (item.unitPriceCents / 100).toFixed(2).replace(".", ","),
    status: item.status,
  };
}

export function ItemForm({
  editingItem,
  categories,
  onSubmit,
  onCancelEdit,
}: ItemFormProps) {
  const categoryListId = useId();
  const [form, setForm] = useState<RawItemDraft>(() => formFromItem(editingItem));
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateItemDraft(form);
    if (!result.ok || !result.item) {
      const nextErrors: Record<string, string> = {};
      for (const [field, key] of Object.entries(result.errors)) {
        nextErrors[field] = t.errors[key];
      }
      setErrors(nextErrors);
      return;
    }
    onSubmit(result.item);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  const isEditing = editingItem !== null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4"
    >
      <h2 className="text-sm font-semibold text-zinc-900">
        {isEditing ? t.form.editTitle : t.form.addTitle}
      </h2>

      <Field label={t.form.name} error={errors.name}>
        <input
          type="text"
          value={form.name}
          placeholder={t.form.namePlaceholder}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.form.category}>
          <input
            type="text"
            list={categoryListId}
            value={form.category}
            placeholder={t.form.categoryPlaceholder}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass(false)}
          />
          <datalist id={categoryListId}>
            {[...categories, OTHER_CATEGORY].map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </Field>

        <Field label={t.form.quantity} error={errors.quantity}>
          <input
            type="number"
            min={1}
            step={1}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className={inputClass(!!errors.quantity)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.form.unitPrice} error={errors.unitPrice}>
          <input
            type="text"
            inputMode="decimal"
            placeholder="12,50"
            value={form.unitPrice}
            onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
            className={inputClass(!!errors.unitPrice)}
          />
        </Field>

        <Field label={t.form.status}>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as RawItemDraft["status"] })
            }
            className={inputClass(false)}
          >
            {ITEM_STATUSES.map((status) => (
              <option key={status} value={status}>
                {t.statusLabels[status]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="min-h-10 flex-1 rounded-md bg-accent-filament px-4 text-sm font-semibold text-white"
        >
          {isEditing ? t.form.submitEdit : t.form.submitAdd}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="min-h-10 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-600"
          >
            {t.form.cancel}
          </button>
        )}
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `min-h-10 w-full rounded-md border px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-zinc-200 focus:ring-accent-filament/30"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-zinc-700">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
