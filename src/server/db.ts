import { createClient, type Client } from "@libsql/client";
import type { Order } from "@/domain/types";

let sharedClient: Client | null = null;

function defaultClient(): Client {
  if (!sharedClient) {
    sharedClient = createClient({
      url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return sharedClient;
}

type OrderData = Omit<Order, "id">;

function emptyOrderData(): OrderData {
  return {
    clientName: "",
    title: "",
    items: [],
    categories: [],
    installments: [],
    barterEntries: [],
  };
}

async function ensureSchema(db: Client): Promise<void> {
  await db.execute(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    data TEXT NOT NULL
  )`);
}

export async function createOrder(db: Client = defaultClient()): Promise<Order> {
  await ensureSchema(db);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const data = emptyOrderData();
  await db.execute({
    sql: "INSERT INTO orders (id, created_at, updated_at, data) VALUES (?, ?, ?, ?)",
    args: [id, now, now, JSON.stringify(data)],
  });
  return { id, ...data };
}

export async function getOrder(id: string, db: Client = defaultClient()): Promise<Order | null> {
  await ensureSchema(db);
  const result = await db.execute({
    sql: "SELECT data FROM orders WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return null;
  const data = JSON.parse(result.rows[0].data as string) as OrderData;
  return { id, ...data };
}

export async function saveOrder(id: string, order: Order, db: Client = defaultClient()): Promise<void> {
  await ensureSchema(db);
  const data: OrderData = {
    clientName: order.clientName,
    title: order.title,
    items: order.items,
    categories: order.categories,
    installments: order.installments,
    barterEntries: order.barterEntries,
  };
  const now = new Date().toISOString();
  await db.execute({
    sql: "UPDATE orders SET data = ?, updated_at = ? WHERE id = ?",
    args: [JSON.stringify(data), now, id],
  });
}
