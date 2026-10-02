import { t } from "@/i18n/en";
import { formatBRL } from "@/domain/money";

interface OrderSummaryProps {
  grossTotalCents: number;
  deliveredValueCents: number;
  itemCount: number;
  deliveredItemCount: number;
}

export function OrderSummary({
  grossTotalCents,
  deliveredValueCents,
  itemCount,
  deliveredItemCount,
}: OrderSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatTile label={t.summary.grossTotal} value={formatBRL(grossTotalCents)} />
      <StatTile
        label={t.summary.deliveredValue}
        value={formatBRL(deliveredValueCents)}
        highlight
      />
      <StatTile label={t.summary.itemCount} value={String(itemCount)} />
      <StatTile
        label={t.summary.deliveredItemCount}
        value={String(deliveredItemCount)}
      />
    </div>
  );
}

export function StatTile({
  label,
  value,
  highlight,
  danger,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        danger
          ? "border-red-300 bg-red-50"
          : highlight
            ? "border-accent-filament/40 bg-orange-50"
            : "border-zinc-200 bg-white"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-xl font-semibold ${
          danger ? "text-red-700" : highlight ? "text-orange-700" : "text-zinc-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
