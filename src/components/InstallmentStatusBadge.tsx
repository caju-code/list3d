import { t } from "@/i18n/en";
import type { InstallmentStatus } from "@/domain/types";

const INSTALLMENT_STATUS_STYLES: Record<InstallmentStatus, string> = {
  planned: "border-neutral-300 bg-surface text-neutral-600 font-medium tracking-wide",
  agreed: "border-accent-petrol/40 bg-accent-petrol/10 text-accent-petrol font-medium tracking-wide",
  paid: "border-accent-petrol bg-accent-petrol text-canvas font-bold tracking-wider",
  compensated:
    "border-accent-violet/40 bg-accent-violet/10 text-accent-violet font-medium tracking-wide",
};

export function InstallmentStatusBadge({ status }: { status: InstallmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs ${INSTALLMENT_STATUS_STYLES[status]}`}
    >
      {t.installmentStatusLabels[status]}
    </span>
  );
}
