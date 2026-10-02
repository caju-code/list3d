export const ITEM_STATUSES = [
  "quoted",
  "approved",
  "in_production",
  "ready",
  "delivered",
] as const;

export type ItemStatus = (typeof ITEM_STATUSES)[number];

export const OTHER_CATEGORY = "Other" as const;

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPriceCents: number;
  status: ItemStatus;
}

export const INSTALLMENT_STATUSES = [
  "planned",
  "agreed",
  "paid",
  "compensated",
] as const;

export type InstallmentStatus = (typeof INSTALLMENT_STATUSES)[number];

export interface Installment {
  id: string;
  description: string;
  amountCents: number;
  date?: string;
  status: InstallmentStatus;
  note?: string;
}

export type InstallmentDraft = Omit<Installment, "id">;

export const BARTER_TYPES = [
  "barter_credit",
  "manual_adjustment",
  "discount",
] as const;

export type BarterType = (typeof BARTER_TYPES)[number];

export interface BarterEntry {
  id: string;
  description: string;
  amountCents: number;
  type: BarterType;
  date?: string;
  note?: string;
}

export type BarterEntryDraft = Omit<BarterEntry, "id">;

export interface Order {
  id: string;
  clientName: string;
  title: string;
  items: OrderItem[];
  categories: string[];
  installments: Installment[];
  barterEntries: BarterEntry[];
}

export type ItemDraft = Omit<OrderItem, "id">;
