import { t } from "@/i18n/en";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4">
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 shrink-0 text-accent-filament"
          aria-hidden="true"
        >
          <path
            d="M4 18 L20 18 M4 14.5 L20 14.5 M4 11 L20 11 M4 7.5 L20 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            {t.appTitle}
          </h1>
          <p className="text-sm text-zinc-500">{t.appSubtitle}</p>
        </div>
      </div>
      <button
        type="button"
        disabled
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-400"
      >
        {t.shareLink}
        <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
          {t.shareLinkSoon}
        </span>
      </button>
    </header>
  );
}
