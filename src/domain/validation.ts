import type { ErrorKey } from "@/i18n/en";
import { parsePriceToCents } from "./money";
import type { ItemDraft, ItemStatus } from "./types";

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

  const category = raw.category.trim() || "Other";

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
