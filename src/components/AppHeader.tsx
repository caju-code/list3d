import { t } from "@/i18n/en";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-neutral-300 pb-4">
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 shrink-0 text-accent-filament"
          aria-hidden="true"
        >
          <path
            d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z M12 2 L12 12 M3 7 L12 12 M21 7 L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-900">
            {t.appTitle}
          </h1>
          <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
            {t.appSubtitle}
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled
        className="flex shrink-0 items-center gap-1.5 rounded border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-400"
      >
        {t.shareLink}
        <span className="rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          {t.shareLinkSoon}
        </span>
      </button>
    </header>
  );
}
