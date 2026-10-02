import { t } from "@/i18n/en";
import type { BarterType } from "@/domain/types";

const BARTER_TYPE_STYLES: Record<BarterType, string> = {
  barter_credit: "border-accent-filament/40 bg-accent-filament/10 text-accent-filament",
  manual_adjustment: "border-neutral-300 bg-surface text-neutral-600",
  discount: "border-accent-petrol/40 bg-accent-petrol/10 text-accent-petrol",
};

export function BarterTypeBadge({ type }: { type: BarterType }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${BARTER_TYPE_STYLES[type]}`}
    >
      {t.barterTypeLabels[type]}
    </span>
  );
}
