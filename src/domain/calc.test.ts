import { describe, expect, it } from "vitest";
import type { OrderItem } from "./types";
import {
  deliveredItemCount,
  deliveredValue,
  grossTotal,
  groupByCategory,
  itemCount,
  itemSubtotal,
} from "./calc";

function makeItem(overrides: Partial<OrderItem> = {}): OrderItem {
  return {
    id: "item-1",
    name: "Token organizer",
    category: "Organizers",
    quantity: 2,
    unitPriceCents: 500,
    status: "quoted",
    ...overrides,
  };
}

describe("itemSubtotal", () => {
  it("multiplies quantity by unit price", () => {
    expect(itemSubtotal(makeItem({ quantity: 3, unitPriceCents: 250 }))).toBe(750);
  });
});

describe("grossTotal", () => {
  it("sums subtotals across all items regardless of status", () => {
    const items = [
      makeItem({ quantity: 2, unitPriceCents: 500, status: "quoted" }),
      makeItem({ id: "item-2", quantity: 1, unitPriceCents: 1000, status: "delivered" }),
    ];
    expect(grossTotal(items)).toBe(2000);
  });
});

describe("deliveredValue", () => {
  it("only sums items with delivered status", () => {
    const items = [
      makeItem({ quantity: 2, unitPriceCents: 500, status: "quoted" }),
      makeItem({ id: "item-2", quantity: 1, unitPriceCents: 1000, status: "delivered" }),
    ];
    expect(deliveredValue(items)).toBe(1000);
  });

  it("returns 0 when nothing is delivered", () => {
    expect(deliveredValue([makeItem({ status: "ready" })])).toBe(0);
  });
});

describe("itemCount", () => {
  it("counts line items, not summed quantities", () => {
    const items = [
      makeItem({ id: "item-1", quantity: 5 }),
      makeItem({ id: "item-2", quantity: 1 }),
    ];
    expect(itemCount(items)).toBe(2);
  });
});

describe("deliveredItemCount", () => {
  it("counts only delivered line items", () => {
    const items = [
      makeItem({ id: "item-1", status: "delivered" }),
      makeItem({ id: "item-2", status: "quoted" }),
      makeItem({ id: "item-3", status: "delivered" }),
    ];
    expect(deliveredItemCount(items)).toBe(2);
  });
});

describe("groupByCategory", () => {
  it("groups items by category with a subtotal per group", () => {
    const items = [
      makeItem({ id: "item-1", category: "Organizers", quantity: 2, unitPriceCents: 500 }),
      makeItem({ id: "item-2", category: "Miniatures", quantity: 1, unitPriceCents: 1000 }),
      makeItem({ id: "item-3", category: "Organizers", quantity: 1, unitPriceCents: 300 }),
    ];
    const groups = groupByCategory(items);
    expect(groups.map((g) => g.category)).toEqual(["Miniatures", "Organizers"]);
    const organizers = groups.find((g) => g.category === "Organizers");
    expect(organizers?.items).toHaveLength(2);
    expect(organizers?.subtotalCents).toBe(1300);
  });

  it("sorts groups alphabetically but always puts Other last", () => {
    const items = [
      makeItem({ id: "item-1", category: "Other" }),
      makeItem({ id: "item-2", category: "Miniatures" }),
      makeItem({ id: "item-3", category: "Inserts" }),
    ];
    const groups = groupByCategory(items);
    expect(groups.map((g) => g.category)).toEqual(["Inserts", "Miniatures", "Other"]);
  });
});
