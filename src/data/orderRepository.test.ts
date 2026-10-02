import { afterEach, describe, expect, it, vi } from "vitest";
import type { Order } from "@/domain/types";
import { createOrderRepository } from "./orderRepository";

const baseOrder: Order = {
  id: "order-123",
  clientName: "Board Haven Games",
  title: "Insert order",
  items: [],
  categories: [],
  installments: [],
  barterEntries: [],
};

describe("createOrderRepository", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("load() returns the initial order it was created with", () => {
    const repository = createOrderRepository("order-123", baseOrder);

    expect(repository.load()).toBe(baseOrder);
  });

  it("save() PUTs the order JSON to the order's API route", () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    const repository = createOrderRepository("order-123", baseOrder);
    const updated: Order = { ...baseOrder, clientName: "Updated Client" };

    repository.save(updated);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/orders/order-123",
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
        body: JSON.stringify(updated),
      }),
    );
  });
});
