import { t } from "@/i18n/en";
import { groupByCategory } from "@/domain/calc";
import type { OrderItem } from "@/domain/types";
import { CategoryGroup } from "./CategoryGroup";

interface ItemListProps {
  items: OrderItem[];
  onEdit: (item: OrderItem) => void;
  onDelete: (id: string) => void;
}

export function ItemList({ items, onEdit, onDelete }: ItemListProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
        {t.list.empty}
      </p>
    );
  }

  const groups = groupByCategory(items);

  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <CategoryGroup
          key={group.category}
          group={group}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
