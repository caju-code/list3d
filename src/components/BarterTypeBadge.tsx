import { t } from "@/i18n/en";
import type { BarterType } from "@/domain/types";

const BARTER_TYPE_STYLES: Record<BarterType, string> = {
  barter_credit: "border-amber-300 bg-amber-50 text-amber-800",
  manual_adjustment: "border-zinc-300 bg-white text-zinc-600",
  discount: "border-accent-petrol/40 bg-teal-50 text-teal-800",
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
