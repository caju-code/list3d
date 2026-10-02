import { describe, expect, it } from "vitest";
import { createClient } from "@libsql/client";
import { createOrder, getOrder } from "@/server/db";
import { PUT } from "./route";

describe("PUT /api/orders/[id]", () => {
  it("saves the submitted order and responds with 204", async () => {
    const db = createClient({ url: ":memory:" });
    const created = await createOrder(db);
    const updated = { ...created, clientName: "Board Haven Games" };
    const request = new Request(`http://localhost/api/orders/${created.id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });

    const response = await PUT(request, { params: Promise.resolve({ id: created.id }) }, db);

    expect(response.status).toBe(204);
    const loaded = await getOrder(created.id, db);
    expect(loaded?.clientName).toBe("Board Haven Games");
  });
});
