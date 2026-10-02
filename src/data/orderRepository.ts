import type { Order } from "@/domain/types";

export interface OrderRepository {
  load(): Order;
  save(order: Order): void;
}

export function createOrderRepository(id: string, initialOrder: Order): OrderRepository {
  return {
    load() {
      return initialOrder;
    },
    save(order: Order) {
      void fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    },
  };
}
