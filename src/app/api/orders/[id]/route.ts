import type { Client } from "@libsql/client";
import { saveOrder } from "@/server/db";
import type { Order } from "@/domain/types";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
  db?: Client,
): Promise<Response> {
  const { id } = await context.params;
  const order = (await request.json()) as Order;

  await saveOrder(id, order, db);

  return new Response(null, { status: 204 });
}
