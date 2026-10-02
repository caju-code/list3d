import { t } from "@/i18n/en";
import type { ItemStatus } from "@/domain/types";

const STATUS_STYLES: Record<ItemStatus, string> = {
  quoted: "border-neutral-300 bg-surface text-neutral-600 font-medium tracking-wide",
  approved: "border-accent-petrol/40 bg-accent-petrol/10 text-accent-petrol font-medium tracking-wide",
  in_production:
    "border-accent-filament/40 bg-accent-filament/10 text-accent-filament font-medium tracking-wide",
  ready: "border-accent-violet/40 bg-accent-violet/10 text-accent-violet font-medium tracking-wide",
  delivered: "border-accent-petrol bg-accent-petrol text-canvas font-bold tracking-wider",
};

export function StatusBadge({ status }: { status: ItemStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs ${STATUS_STYLES[status]}`}
    >
      {t.statusLabels[status]}
    </span>
  );
}
