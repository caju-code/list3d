"use client";

import { useState } from "react";
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
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-baseline justify-between text-left"
      >
        <h3 className="text-sm font-semibold text-zinc-900">
          <span aria-hidden="true" className="mr-1 inline-block w-3 text-zinc-400">
            {expanded ? "−" : "+"}
          </span>
          {group.category}{" "}
          <span className="font-normal text-zinc-400">({group.items.length})</span>
        </h3>
        <p className="font-mono text-sm text-zinc-500">
          {formatBRL(group.subtotalCents)}
        </p>
      </button>
      {expanded && (
        <ul>
          {group.items.map((item) => (
            <ItemRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
