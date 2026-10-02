import { t } from "@/i18n/en";

export function AppFooter() {
  return (
    <footer className="flex flex-col items-center gap-1 border-t border-neutral-200 pt-4 pb-2 text-center text-xs text-neutral-500">
      <p className="flex items-center gap-1">
        {t.madeByPrefix}
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-accent-filament" aria-hidden="true">
          <path d="M12 21s-7.5-4.6-10.2-9.1C.3 9.2 1.3 5.6 4.5 4.6c2-.6 4 .2 5.2 1.9L12 9l2.3-2.5c1.2-1.7 3.2-2.5 5.2-1.9 3.2 1 4.2 4.6 2.7 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
        {t.madeBySuffix}
      </p>
      <p>{t.iconAttribution}</p>
    </footer>
  );
}
