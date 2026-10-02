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
      className={`rounded border-l-2 bg-surface p-3 ${
        danger
          ? "border-l-accent-filament"
          : highlight
            ? "border-l-accent-petrol"
            : "border-l-neutral-300"
      }`}
    >
      <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-xl font-semibold ${
          danger ? "text-accent-filament" : highlight ? "text-accent-petrol" : "text-neutral-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
