import { formatBRL } from "@/domain/money";
import type { CategoryGroup as CategoryGroupData } from "@/domain/calc";
import type { OrderItem } from "@/domain/types";
import { ItemRow } from "./ItemRow";

interface CategoryGroupProps {
  group: CategoryGroupData;
  onEdit: (item: OrderItem) => void;
  onDelete: (id: string) => void;
}

export function CategoryGroup({ group, onEdit, onDelete }: CategoryGroupProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-zinc-900">
          {group.category}{" "}
          <span className="font-normal text-zinc-400">({group.items.length})</span>
        </h3>
        <p className="font-mono text-sm text-zinc-500">
          {formatBRL(group.subtotalCents)}
        </p>
      </div>
      <ul>
        {group.items.map((item) => (
          <ItemRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
