import { describe, expect, it } from "vitest";
import type { BarterEntry, Installment, OrderItem } from "./types";
import {
  barterCreditTotal,
  compensatedInstallmentsTotal,
  plannedInstallmentsTotal,
  remainingBalance,
  settledInstallmentsTotal,
  settlementDifference,
} from "./settlement";

function makeItem(overrides: Partial<OrderItem> = {}): OrderItem {
  return {
    id: "item-1",
    name: "Game box insert",
    category: "Inserts",
    quantity: 1,
    unitPriceCents: 10000,
    status: "quoted",
    ...overrides,
  };
}

function makeInstallment(overrides: Partial<Installment> = {}): Installment {
  return {
    id: "inst-1",
    description: "First installment",
    amountCents: 3000,
    status: "planned",
    ...overrides,
  };
}

function makeBarterEntry(overrides: Partial<BarterEntry> = {}): BarterEntry {
  return {
    id: "barter-1",
    description: "Rental credit",
    amountCents: 2000,
    type: "barter_credit",
    ...overrides,
  };
}

describe("barterCreditTotal", () => {
  it("sums all barter entries regardless of type", () => {
    const entries = [
      makeBarterEntry({ id: "b1", amountCents: 2000, type: "barter_credit" }),
      makeBarterEntry({ id: "b2", amountCents: 500, type: "discount" }),
      makeBarterEntry({ id: "b3", amountCents: 300, type: "manual_adjustment" }),
    ];
    expect(barterCreditTotal(entries)).toBe(2800);
  });

  it("returns 0 for no entries", () => {
    expect(barterCreditTotal([])).toBe(0);
  });
});

describe("settledInstallmentsTotal", () => {
  it("sums only installments with status paid", () => {
    const installments = [
      makeInstallment({ id: "i1", amountCents: 3000, status: "paid" }),
      makeInstallment({ id: "i2", amountCents: 1000, status: "planned" }),
      makeInstallment({ id: "i3", amountCents: 2000, status: "compensated" }),
      makeInstallment({ id: "i4", amountCents: 1500, status: "agreed" }),
    ];
    expect(settledInstallmentsTotal(installments)).toBe(3000);
  });

  it("returns 0 when nothing is paid", () => {
    expect(
      settledInstallmentsTotal([makeInstallment({ status: "compensated" })]),
    ).toBe(0);
  });
});

describe("compensatedInstallmentsTotal", () => {
  it("sums only installments with status compensated", () => {
    const installments = [
      makeInstallment({ id: "i1", amountCents: 3000, status: "paid" }),
      makeInstallment({ id: "i2", amountCents: 2000, status: "compensated" }),
      makeInstallment({ id: "i3", amountCents: 1500, status: "agreed" }),
    ];
    expect(compensatedInstallmentsTotal(installments)).toBe(2000);
  });

  it("returns 0 when nothing is compensated", () => {
    expect(compensatedInstallmentsTotal([makeInstallment({ status: "paid" })])).toBe(0);
  });
});

describe("plannedInstallmentsTotal", () => {
  it("sums all installments regardless of status", () => {
    const installments = [
      makeInstallment({ id: "i1", amountCents: 3000, status: "paid" }),
      makeInstallment({ id: "i2", amountCents: 1000, status: "planned" }),
      makeInstallment({ id: "i3", amountCents: 2000, status: "compensated" }),
    ];
    expect(plannedInstallmentsTotal(installments)).toBe(6000);
  });
});

describe("remainingBalance", () => {
  it("subtracts barter credits and settled installments from delivered value", () => {
    const items = [makeItem({ quantity: 1, unitPriceCents: 10000, status: "delivered" })];
    const entries = [makeBarterEntry({ amountCents: 2000 })];
    const installments = [makeInstallment({ amountCents: 3000, status: "paid" })];
    expect(remainingBalance(items, entries, installments)).toBe(5000);
  });

  it("ignores unpaid installments", () => {
    const items = [makeItem({ quantity: 1, unitPriceCents: 10000, status: "delivered" })];
    const installments = [makeInstallment({ amountCents: 3000, status: "planned" })];
    expect(remainingBalance(items, [], installments)).toBe(10000);
  });

  it("ignores items that have not been delivered yet", () => {
    const items = [
      makeItem({ id: "i1", quantity: 1, unitPriceCents: 10000, status: "delivered" }),
      makeItem({ id: "i2", quantity: 1, unitPriceCents: 5000, status: "in_production" }),
    ];
    expect(remainingBalance(items, [], [])).toBe(10000);
  });
});

describe("settlementDifference", () => {
  it("is zero when the full installment plan matches what's owed on delivered items after barter credits", () => {
    const items = [makeItem({ quantity: 1, unitPriceCents: 10000, status: "delivered" })];
    const entries = [makeBarterEntry({ amountCents: 2000 })];
    const installments = [
      makeInstallment({ id: "i1", amountCents: 5000, status: "planned" }),
      makeInstallment({ id: "i2", amountCents: 3000, status: "paid" }),
    ];
    expect(settlementDifference(items, entries, installments)).toBe(0);
  });

  it("is positive when the plan is over-scheduled relative to what's owed", () => {
    const items = [makeItem({ quantity: 1, unitPriceCents: 10000, status: "delivered" })];
    const installments = [makeInstallment({ amountCents: 12000, status: "planned" })];
    expect(settlementDifference(items, [], installments)).toBe(2000);
  });

  it("is negative when the plan is under-scheduled relative to what's owed", () => {
    const items = [makeItem({ quantity: 1, unitPriceCents: 10000, status: "delivered" })];
    const installments = [makeInstallment({ amountCents: 4000, status: "planned" })];
    expect(settlementDifference(items, [], installments)).toBe(-6000);
  });
});
