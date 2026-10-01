import { describe, expect, it } from "vitest";
import { validateCategoryName, validateItemDraft } from "./validation";

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
