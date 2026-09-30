export const ITEM_STATUSES = [
  "quoted",
  "approved",
  "in_production",
  "ready",
  "delivered",
] as const;

export type ItemStatus = (typeof ITEM_STATUSES)[number];

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPriceCents: number;
  status: ItemStatus;
}

export interface Order {
  id: string;
  clientName: string;
  title: string;
  items: OrderItem[];
}

export type ItemDraft = Omit<OrderItem, "id">;
