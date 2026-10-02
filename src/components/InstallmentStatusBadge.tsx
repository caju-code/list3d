import { t } from "@/i18n/en";
import type { InstallmentStatus } from "@/domain/types";

const INSTALLMENT_STATUS_STYLES: Record<InstallmentStatus, string> = {
  planned: "bg-zinc-100 text-zinc-600 ring-zinc-300",
  agreed: "bg-blue-50 text-blue-700 ring-blue-300",
  paid: "bg-green-50 text-green-700 ring-green-300",
  compensated: "bg-violet-50 text-violet-700 ring-violet-300",
};

export function InstallmentStatusBadge({ status }: { status: InstallmentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${INSTALLMENT_STATUS_STYLES[status]}`}
    >
      {t.installmentStatusLabels[status]}
    </span>
  );
}
