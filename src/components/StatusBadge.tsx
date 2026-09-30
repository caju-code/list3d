import { t } from "@/i18n/en";
import type { ItemStatus } from "@/domain/types";

const STATUS_STYLES: Record<ItemStatus, string> = {
  quoted: "bg-zinc-100 text-zinc-600 ring-zinc-300",
  approved: "bg-blue-50 text-blue-700 ring-blue-300",
  in_production: "bg-amber-50 text-amber-700 ring-amber-300",
  ready: "bg-violet-50 text-violet-700 ring-violet-300",
  delivered: "bg-green-50 text-green-700 ring-green-300",
};

export function StatusBadge({ status }: { status: ItemStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {t.statusLabels[status]}
    </span>
  );
}
