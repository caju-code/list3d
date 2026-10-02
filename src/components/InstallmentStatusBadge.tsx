import { t } from "@/i18n/en";
import type { InstallmentStatus } from "@/domain/types";

const INSTALLMENT_STATUS_STYLES: Record<InstallmentStatus, string> = {
  planned: "border-zinc-300 bg-white text-zinc-600",
  agreed: "border-accent-petrol/40 bg-teal-50 text-teal-800",
  paid: "border-accent-filament bg-accent-filament text-white",
  compensated: "border-violet-300 bg-violet-50 text-violet-800",
};

export function InstallmentStatusBadge({ status }: { status: InstallmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${INSTALLMENT_STATUS_STYLES[status]}`}
    >
      {t.installmentStatusLabels[status]}
    </span>
  );
}
