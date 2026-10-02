import { describe, expect, it } from "vitest";
import {
  validateBarterEntryDraft,
  validateCategoryName,
  validateInstallmentDraft,
  validateItemDraft,
} from "./validation";

const validRaw = {
  name: "Token organizer",
  category: "Organizers",
  quantity: "2",
  unitPrice: "12,50",
  status: "quoted" as const,
};

describe("validateItemDraft", () => {
  it("accepts a valid draft", () => {
    const result = validateItemDraft(validRaw);
    expect(result.ok).toBe(true);
    expect(result.item).toEqual({
      name: "Token organizer",
      category: "Organizers",
      quantity: 2,
      unitPriceCents: 1250,
      status: "quoted",
    });
    expect(result.errors).toEqual({});
  });

  it("defaults an empty category to Other", () => {
    const result = validateItemDraft({ ...validRaw, category: "" });
    expect(result.ok).toBe(true);
    expect(result.item?.category).toBe("Other");
  });

  it("defaults a whitespace-only category to Other", () => {
    const result = validateItemDraft({ ...validRaw, category: "   " });
    expect(result.item?.category).toBe("Other");
  });

  it("rejects an empty name", () => {
    const result = validateItemDraft({ ...validRaw, name: "" });
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects a whitespace-only name", () => {
    const result = validateItemDraft({ ...validRaw, name: "   " });
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects quantity of 0", () => {
    const result = validateItemDraft({ ...validRaw, quantity: "0" });
    expect(result.ok).toBe(false);
    expect(result.errors.quantity).toBeDefined();
  });

  it("rejects a non-numeric quantity", () => {
    const result = validateItemDraft({ ...validRaw, quantity: "abc" });
    expect(result.ok).toBe(false);
    expect(result.errors.quantity).toBeDefined();
  });

  it("rejects a non-numeric unit price", () => {
    const result = validateItemDraft({ ...validRaw, unitPrice: "abc" });
    expect(result.ok).toBe(false);
    expect(result.errors.unitPrice).toBeDefined();
  });

  it("collects multiple errors at once", () => {
    const result = validateItemDraft({ ...validRaw, name: "", quantity: "0" });
    expect(result.ok).toBe(false);
    expect(Object.keys(result.errors)).toEqual(
      expect.arrayContaining(["name", "quantity"]),
    );
  });
});

describe("validateCategoryName", () => {
  const existing = ["Organizers", "Miniatures"];

  it("accepts a new, unique name and trims it", () => {
    const result = validateCategoryName("  Storage  ", existing);
    expect(result.ok).toBe(true);
    expect(result.name).toBe("Storage");
  });

  it("rejects an empty name", () => {
    expect(validateCategoryName("", existing).ok).toBe(false);
    expect(validateCategoryName("   ", existing).ok).toBe(false);
  });

  it("rejects a case-insensitive match to the reserved Other category", () => {
    expect(validateCategoryName("other", existing).ok).toBe(false);
    expect(validateCategoryName("OTHER", existing).ok).toBe(false);
  });

  it("rejects a case-insensitive duplicate of an existing category", () => {
    expect(validateCategoryName("organizers", existing).ok).toBe(false);
  });

  it("accepts a name equal to the excluded name (rename no-op)", () => {
    const result = validateCategoryName("Organizers", existing, "Organizers");
    expect(result.ok).toBe(true);
  });
});

const validInstallmentRaw = {
  description: "First installment",
  amount: "30,00",
  date: "2026-10-01",
  status: "planned" as const,
  note: "",
};

describe("validateInstallmentDraft", () => {
  it("accepts a valid draft", () => {
    const result = validateInstallmentDraft(validInstallmentRaw);
    expect(result.ok).toBe(true);
    expect(result.item).toEqual({
      description: "First installment",
      amountCents: 3000,
      date: "2026-10-01",
      status: "planned",
      note: undefined,
    });
  });

  it("rejects an empty description", () => {
    const result = validateInstallmentDraft({ ...validInstallmentRaw, description: "" });
    expect(result.ok).toBe(false);
    expect(result.errors.description).toBeDefined();
  });

  it("rejects a non-numeric amount", () => {
    const result = validateInstallmentDraft({ ...validInstallmentRaw, amount: "abc" });
    expect(result.ok).toBe(false);
    expect(result.errors.amount).toBeDefined();
  });

  it("treats an empty date and note as undefined", () => {
    const result = validateInstallmentDraft({ ...validInstallmentRaw, date: "", note: "  " });
    expect(result.item?.date).toBeUndefined();
    expect(result.item?.note).toBeUndefined();
  });
});

const validBarterRaw = {
  description: "Rental credit",
  amount: "20,00",
  type: "barter_credit" as const,
  date: "",
  note: "",
};

describe("validateBarterEntryDraft", () => {
  it("accepts a valid draft", () => {
    const result = validateBarterEntryDraft(validBarterRaw);
    expect(result.ok).toBe(true);
    expect(result.item).toEqual({
      description: "Rental credit",
      amountCents: 2000,
      type: "barter_credit",
      date: undefined,
      note: undefined,
    });
  });

  it("rejects an empty description", () => {
    const result = validateBarterEntryDraft({ ...validBarterRaw, description: "" });
    expect(result.ok).toBe(false);
    expect(result.errors.description).toBeDefined();
  });

  it("rejects a non-numeric amount", () => {
    const result = validateBarterEntryDraft({ ...validBarterRaw, amount: "abc" });
    expect(result.ok).toBe(false);
    expect(result.errors.amount).toBeDefined();
  });

  it("rejects a negative amount for barter_credit", () => {
    const result = validateBarterEntryDraft({ ...validBarterRaw, amount: "-20,00" });
    expect(result.ok).toBe(false);
    expect(result.errors.amount).toBeDefined();
  });

  it("rejects a negative amount for discount", () => {
    const result = validateBarterEntryDraft({
      ...validBarterRaw,
      type: "discount",
      amount: "-20,00",
    });
    expect(result.ok).toBe(false);
    expect(result.errors.amount).toBeDefined();
  });

  it("accepts a negative amount for manual_adjustment (a charge)", () => {
    const result = validateBarterEntryDraft({
      ...validBarterRaw,
      type: "manual_adjustment",
      amount: "-20,00",
    });
    expect(result.ok).toBe(true);
    expect(result.item?.amountCents).toBe(-2000);
  });

  it("accepts a positive amount for manual_adjustment (a credit)", () => {
    const result = validateBarterEntryDraft({
      ...validBarterRaw,
      type: "manual_adjustment",
      amount: "20,00",
    });
    expect(result.ok).toBe(true);
    expect(result.item?.amountCents).toBe(2000);
  });
});
