import type { ErrorKey } from "@/i18n/en";
import { parsePriceToCents } from "./money";
import { OTHER_CATEGORY, type ItemDraft, type ItemStatus } from "./types";

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
