"use client";

import { useState } from "react";
import { t } from "@/i18n/en";
import { formatCentsForInput } from "@/domain/money";
import { INSTALLMENT_STATUSES, type Installment, type InstallmentDraft } from "@/domain/types";
import { validateInstallmentDraft, type RawInstallmentDraft } from "@/domain/validation";
import { Field, inputClass } from "./formControls";

interface InstallmentFormProps {
  editingInstallment: Installment | null;
  onSubmit: (draft: InstallmentDraft) => void;
  onCancelEdit: () => void;
}

const EMPTY_FORM: RawInstallmentDraft = {
  description: "",
  amount: "",
  date: "",
  status: "planned",
  note: "",
};

function formFromInstallment(installment: Installment | null): RawInstallmentDraft {
  if (!installment) return EMPTY_FORM;
  return {
    description: installment.description,
    amount: formatCentsForInput(installment.amountCents),
    date: installment.date ?? "",
    status: installment.status,
    note: installment.note ?? "",
  };
}

export function InstallmentForm({
  editingInstallment,
  onSubmit,
  onCancelEdit,
}: InstallmentFormProps) {
  const [form, setForm] = useState<RawInstallmentDraft>(() =>
    formFromInstallment(editingInstallment),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = validateInstallmentDraft(form);
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

  const isEditing = editingInstallment !== null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-zinc-900">
        {isEditing ? t.installments.editTitle : t.installments.addTitle}
      </h3>

      <Field label={t.installments.description} error={errors.description}>
        <input
          type="text"
          value={form.description}
          placeholder={t.installments.descriptionPlaceholder}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={inputClass(!!errors.description)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.installments.amount} error={errors.amount}>
          <input
            type="text"
            inputMode="decimal"
            placeholder="30,00"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={inputClass(!!errors.amount)}
          />
        </Field>

        <Field label={t.installments.status}>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as RawInstallmentDraft["status"] })
            }
            className={inputClass(false)}
          >
            {INSTALLMENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {t.installmentStatusLabels[status]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t.installments.date}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass(false)}
          />
        </Field>

        <Field label={t.installments.note}>
          <input
            type="text"
            value={form.note}
            placeholder={t.installments.notePlaceholder}
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
          {isEditing ? t.installments.submitEdit : t.installments.submitAdd}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="min-h-10 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-600"
          >
            {t.installments.cancel}
          </button>
        )}
      </div>
    </form>
  );
}
