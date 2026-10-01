import type { Order } from "@/domain/types";

export interface OrderRepository {
  load(): Order;
  save(order: Order): void;
}

const seedOrder: Order = {
  id: "order-1",
  clientName: "Board Haven Games",
  title: "Board Haven Games — insert order",
  categories: ["Inserts", "Organizers", "Miniatures"],
  items: [
    {
      id: "seed-1",
      name: "Game box insert (full tray)",
      category: "Inserts",
      quantity: 1,
      unitPriceCents: 8500,
      status: "delivered",
    },
    {
      id: "seed-2",
      name: "Token organizer, 6-slot",
      category: "Organizers",
      quantity: 4,
      unitPriceCents: 1200,
      status: "ready",
    },
    {
      id: "seed-3",
      name: "Miniature base, 32mm",
      category: "Miniatures",
      quantity: 20,
      unitPriceCents: 150,
      status: "in_production",
    },
    {
      id: "seed-4",
      name: "Miniature base, 25mm",
      category: "Miniatures",
      quantity: 30,
      unitPriceCents: 120,
      status: "approved",
    },
    {
      id: "seed-5",
      name: "Card divider set",
      category: "Other",
      quantity: 2,
      unitPriceCents: 600,
      status: "quoted",
    },
  ],
};

export const mockOrderRepository: OrderRepository = {
  load() {
    return seedOrder;
  },
  save() {
    // no-op: mock persistence, replaced by localStorage/API repository later
  },
};
