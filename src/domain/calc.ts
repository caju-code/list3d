import { OTHER_CATEGORY, type OrderItem } from "./types";

export function itemSubtotal(item: OrderItem): number {
  return item.quantity * item.unitPriceCents;
}

export function grossTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + itemSubtotal(item), 0);
}

export function deliveredValue(items: OrderItem[]): number {
  return items
    .filter((item) => item.status === "delivered")
    .reduce((sum, item) => sum + itemSubtotal(item), 0);
}

export function itemCount(items: OrderItem[]): number {
  return items.length;
}

export function deliveredItemCount(items: OrderItem[]): number {
  return items.filter((item) => item.status === "delivered").length;
}

export interface CategoryGroup {
  category: string;
  items: OrderItem[];
  subtotalCents: number;
}

export function groupByCategory(items: OrderItem[]): CategoryGroup[] {
  const byCategory = new Map<string, OrderItem[]>();
  for (const item of items) {
    const group = byCategory.get(item.category) ?? [];
    group.push(item);
    byCategory.set(item.category, group);
  }

  const groups: CategoryGroup[] = Array.from(byCategory.entries()).map(
    ([category, groupItems]) => ({
      category,
      items: groupItems,
      subtotalCents: grossTotal(groupItems),
    }),
  );

  return groups.sort((a, b) => {
    if (a.category === OTHER_CATEGORY) return 1;
    if (b.category === OTHER_CATEGORY) return -1;
    return a.category.localeCompare(b.category);
  });
}

export function reassignCategory(
  items: OrderItem[],
  from: string,
  to: string,
): OrderItem[] {
  return items.map((item) =>
    item.category === from ? { ...item, category: to } : item,
  );
}
