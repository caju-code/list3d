"use client";

import { useState } from "react";
import { t } from "@/i18n/en";
import { formatCentsForInput } from "@/domain/money";
import { BARTER_TYPES, type BarterEntry, type BarterEntryDraft } from "@/domain/types";
import { validateBarterEntryDraft, type RawBarterEntryDraft } from "@/domain/validation";
import { Field, inputClass } from "./formControls";

interface BarterEntryFormProps {
  editingEntry: BarterEntry | null;
  onSubmit: (draft: BarterEntryDraft) => void;
  onCancelEdit: () => void;
}

const EMPTY_FORM: RawBarterEntryDraft = {
  description: "",
  amount: "",
  type: "barter_credit",
  date: "",
  note: "",
};

function formFromEntry(entry: BarterEntry | null): RawBarterEntryDraft {
  if (!entry) return EMPTY_FORM;
  return {
    description: entry.description,
    amount: formatCentsForInput(entry.amountCents),
    type: entry.type,
    date: entry.date ?? "",
    note: entry.note ?? "",
  };
}

export function BarterEntryForm({
  editingEntry,
  onSubmit,
  onCancelEdit,
}: BarterEntryFormProps) {
  const [form, setForm] = useState<RawBarterEntryDraft>(() => formFromEntry(editingEntry));
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateBarterEntryDraft(form);
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

  const isEditing = editingEntry !== null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-zinc-900">
        {isEditing ? t.barter.editTitle : t.barter.addTitle}
      </h3>

      <Field label={t.barter.description} error={errors.description}>
        <input
          type="text"
          value={form.description}
          placeholder={t.barter.descriptionPlaceholder}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={inputClass(!!errors.description)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.barter.amount} error={errors.amount}>
          <input
            type="text"
            inputMode="text"
            placeholder={form.type === "manual_adjustment" ? "-20,00" : "20,00"}
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={inputClass(!!errors.amount)}
          />
          {form.type === "manual_adjustment" && (
            <span className="text-xs text-zinc-500">{t.barter.amountHintAdjustment}</span>
          )}
        </Field>

        <Field label={t.barter.type}>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as RawBarterEntryDraft["type"] })
            }
            className={inputClass(false)}
          >
            {BARTER_TYPES.map((type) => (
              <option key={type} value={type}>
                {t.barterTypeLabels[type]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.barter.date}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass(false)}
          />
        </Field>

        <Field label={t.barter.note}>
          <input
            type="text"
            value={form.note}
            placeholder={t.barter.notePlaceholder}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="min-h-10 flex-1 rounded-md bg-accent-filament px-4 text-sm font-semibold text-white"
        >
          {isEditing ? t.barter.submitEdit : t.barter.submitAdd}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="min-h-10 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-600"
          >
            {t.barter.cancel}
          </button>
        )}
      </div>
    </form>
  );
}
