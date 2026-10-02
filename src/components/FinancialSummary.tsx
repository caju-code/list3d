import { t } from "@/i18n/en";
import { formatBRL } from "@/domain/money";
import { grossTotal, deliveredValue } from "@/domain/calc";
import {
  barterCreditTotal,
  compensatedInstallmentsTotal,
  remainingBalance,
  settledInstallmentsTotal,
  settlementDifference,
} from "@/domain/settlement";
import type { BarterEntry, Installment, OrderItem } from "@/domain/types";
import { StatTile } from "./OrderSummary";

interface FinancialSummaryProps {
  items: OrderItem[];
  barterEntries: BarterEntry[];
  installments: Installment[];
}

export function FinancialSummary({
  items,
  barterEntries,
  installments,
}: FinancialSummaryProps) {
  const difference = settlementDifference(items, barterEntries, installments);
  const compensated = compensatedInstallmentsTotal(installments);

  let planLabel: string;
  let planDanger = false;
  if (installments.length === 0) {
    planLabel = t.settlement.planEmpty;
  } else if (difference === 0) {
    planLabel = t.settlement.planMatches;
  } else if (difference > 0) {
    planLabel = `${t.settlement.planOverBy} ${formatBRL(difference)}`;
    planDanger = true;
  } else {
    planLabel = `${t.settlement.planShortBy} ${formatBRL(-difference)}`;
    planDanger = true;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatTile label={t.settlement.grossTotal} value={formatBRL(grossTotal(items))} />
      <StatTile
        label={t.settlement.deliveredValue}
        value={formatBRL(deliveredValue(items))}
        highlight
      />
      <StatTile
        label={t.settlement.barterCreditTotal}
        value={formatBRL(barterCreditTotal(barterEntries))}
      />
      <StatTile
        label={t.settlement.installmentsTotal}
        value={formatBRL(settledInstallmentsTotal(installments))}
      />
      <StatTile
        label={t.settlement.remainingBalance}
        value={formatBRL(remainingBalance(items, barterEntries, installments))}
        highlight
      />
      <StatTile label={t.settlement.planLabel} value={planLabel} danger={planDanger} />

      {compensated > 0 && (
        <p className="col-span-2 text-xs text-neutral-500">
          {t.settlement.compensatedCaveatPrefix} {formatBRL(compensated)}{" "}
          {t.settlement.compensatedCaveatSuffix}
        </p>
      )}
    </div>
  );
}
