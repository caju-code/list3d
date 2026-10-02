import { deliveredValue } from "./calc";
import type { BarterEntry, Installment, OrderItem } from "./types";

export function barterCreditTotal(entries: BarterEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.amountCents, 0);
}

export function settledInstallmentsTotal(installments: Installment[]): number {
  return installments
    .filter((installment) => installment.status === "paid")
    .reduce((sum, installment) => sum + installment.amountCents, 0);
}

export function compensatedInstallmentsTotal(installments: Installment[]): number {
  return installments
    .filter((installment) => installment.status === "compensated")
    .reduce((sum, installment) => sum + installment.amountCents, 0);
}

export function plannedInstallmentsTotal(installments: Installment[]): number {
  return installments.reduce((sum, installment) => sum + installment.amountCents, 0);
}

export function remainingBalance(
  items: OrderItem[],
  entries: BarterEntry[],
  installments: Installment[],
): number {
  return (
    deliveredValue(items) - barterCreditTotal(entries) - settledInstallmentsTotal(installments)
  );
}

export function settlementDifference(
  items: OrderItem[],
  entries: BarterEntry[],
  installments: Installment[],
): number {
  return (
    plannedInstallmentsTotal(installments) - (deliveredValue(items) - barterCreditTotal(entries))
  );
}
