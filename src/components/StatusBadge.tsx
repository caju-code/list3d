import { t } from "@/i18n/en";
import type { ItemStatus } from "@/domain/types";

const STATUS_STYLES: Record<ItemStatus, string> = {
  quoted: "border-zinc-300 bg-white text-zinc-600",
  approved: "border-accent-petrol/40 bg-teal-50 text-teal-800",
  in_production: "border-amber-300 bg-amber-50 text-amber-800",
  ready: "border-violet-300 bg-violet-50 text-violet-800",
  delivered: "border-accent-filament bg-accent-filament text-white",
};

export function StatusBadge({ status }: { status: ItemStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {t.statusLabels[status]}
    </span>
  );
}
