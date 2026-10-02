import type { ErrorKey } from "@/i18n/en";
import { parsePriceToCents, parseSignedPriceToCents } from "./money";
import {
  OTHER_CATEGORY,
  type BarterEntryDraft,
  type BarterType,
  type InstallmentDraft,
  type InstallmentStatus,
  type ItemDraft,
  type ItemStatus,
} from "./types";

export interface RawItemDraft {
  name: string;
  category: string;
  quantity: string;
  unitPrice: string;
  status: ItemStatus;
}

export interface ValidationResult {
  ok: boolean;
  item?: ItemDraft;
  errors: Partial<Record<"name" | "quantity" | "unitPrice", ErrorKey>>;
}

export function validateItemDraft(raw: RawItemDraft): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  const name = raw.name.trim();
  if (!name) errors.name = "nameRequired";

  const quantity = Number(raw.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.quantity = "quantityInvalid";
  }

  const unitPriceCents = parsePriceToCents(raw.unitPrice);
  if (unitPriceCents === null) errors.unitPrice = "unitPriceInvalid";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const category = raw.category.trim() || OTHER_CATEGORY;

  return {
    ok: true,
    errors: {},
    item: {
      name,
      category,
      quantity,
      unitPriceCents: unitPriceCents as number,
      status: raw.status,
    },
  };
}

export interface CategoryNameValidationResult {
  ok: boolean;
  name?: string;
  error?: ErrorKey;
}

export function validateCategoryName(
  raw: string,
  existing: string[],
  excluding?: string,
): CategoryNameValidationResult {
  const name = raw.trim();

  if (!name) {
    return { ok: false, error: "categoryNameRequired" };
  }

  if (name.toLowerCase() === OTHER_CATEGORY.toLowerCase()) {
    return { ok: false, error: "categoryNameReserved" };
  }

  const isDuplicate = existing.some(
    (category) =>
      category !== excluding && category.toLowerCase() === name.toLowerCase(),
  );
  if (isDuplicate) {
    return { ok: false, error: "categoryNameDuplicate" };
  }

  return { ok: true, name };
}

function blankToUndefined(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function validateDescriptionAndAmount(
  raw: { description: string; amount: string },
  allowNegative = false,
): {
  errors: Partial<Record<"description" | "amount", ErrorKey>>;
  description: string;
  amountCents: number | null;
} {
  const errors: Partial<Record<"description" | "amount", ErrorKey>> = {};

  const description = raw.description.trim();
  if (!description) errors.description = "descriptionRequired";

  const amountCents = allowNegative
    ? parseSignedPriceToCents(raw.amount)
    : parsePriceToCents(raw.amount);
  if (amountCents === null) errors.amount = "amountInvalid";

  return { errors, description, amountCents };
}

export interface RawInstallmentDraft {
  description: string;
  amount: string;
  date?: string;
  status: InstallmentStatus;
  note?: string;
}

export interface InstallmentValidationResult {
  ok: boolean;
  item?: InstallmentDraft;
  errors: Partial<Record<"description" | "amount", ErrorKey>>;
}

export function validateInstallmentDraft(
  raw: RawInstallmentDraft,
): InstallmentValidationResult {
  const { errors, description, amountCents } = validateDescriptionAndAmount(raw);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: {},
    item: {
      description,
      amountCents: amountCents as number,
      date: blankToUndefined(raw.date ?? ""),
      status: raw.status,
      note: blankToUndefined(raw.note ?? ""),
    },
  };
}

export interface RawBarterEntryDraft {
  description: string;
  amount: string;
  type: BarterType;
  date?: string;
  note?: string;
}

export interface BarterEntryValidationResult {
  ok: boolean;
  item?: BarterEntryDraft;
  errors: Partial<Record<"description" | "amount", ErrorKey>>;
}

export function validateBarterEntryDraft(
  raw: RawBarterEntryDraft,
): BarterEntryValidationResult {
  const { errors, description, amountCents } = validateDescriptionAndAmount(
    raw,
    raw.type === "manual_adjustment",
  );

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: {},
    item: {
      description,
      amountCents: amountCents as number,
      type: raw.type,
      date: blankToUndefined(raw.date ?? ""),
      note: blankToUndefined(raw.note ?? ""),
    },
  };
}
