import { describe, expect, it } from "vitest";
import { createClient } from "@libsql/client";
import { createOrder, getOrder, saveOrder } from "./db";

function freshDb() {
  return createClient({ url: ":memory:" });
}

describe("db", () => {
  it("creates a new order with a generated id and empty collections", async () => {
    const db = freshDb();

    const order = await createOrder(db);

    expect(order.id).toBeTruthy();
    expect(order.items).toEqual([]);
    expect(order.categories).toEqual([]);
    expect(order.installments).toEqual([]);
    expect(order.barterEntries).toEqual([]);
  });

  it("returns null for an unknown order id", async () => {
    const db = freshDb();

    const order = await getOrder("does-not-exist", db);

    expect(order).toBeNull();
  });

  it("round-trips a created order through getOrder", async () => {
    const db = freshDb();
    const created = await createOrder(db);

    const loaded = await getOrder(created.id, db);

    expect(loaded).toEqual(created);
  });

  it("persists changes made via saveOrder", async () => {
    const db = freshDb();
    const created = await createOrder(db);
    const updated = { ...created, clientName: "Board Haven Games" };

    await saveOrder(created.id, updated, db);
    const loaded = await getOrder(created.id, db);

    expect(loaded?.clientName).toBe("Board Haven Games");
  });
});
