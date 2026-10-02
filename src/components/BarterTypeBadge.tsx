import { t } from "@/i18n/en";
import type { BarterType } from "@/domain/types";

const BARTER_TYPE_STYLES: Record<BarterType, string> = {
  barter_credit: "bg-amber-50 text-amber-700 ring-amber-300",
  manual_adjustment: "bg-zinc-100 text-zinc-600 ring-zinc-300",
  discount: "bg-blue-50 text-blue-700 ring-blue-300",
};

export function BarterTypeBadge({ type }: { type: BarterType }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${BARTER_TYPE_STYLES[type]}`}
    >
      {t.barterTypeLabels[type]}
    </span>
  );
}
