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
    <div className="rounded border border-neutral-200 bg-surface p-4">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-baseline justify-between text-left"
      >
        <h3 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">
          <span aria-hidden="true" className="mr-1 inline-block w-3 text-neutral-400 normal-case">
            {expanded ? "−" : "+"}
          </span>
          {group.category}{" "}
          <span className="font-normal normal-case text-neutral-400">({group.items.length})</span>
        </h3>
        <p className="font-mono text-sm text-neutral-500">
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
