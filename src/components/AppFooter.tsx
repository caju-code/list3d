import { t } from "@/i18n/en";

export function AppFooter() {
  return (
    <footer className="border-t border-neutral-200 pt-4 pb-2 text-center text-xs text-neutral-500">
      {t.iconAttribution}
    </footer>
  );
}
