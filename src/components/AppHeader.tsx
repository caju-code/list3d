"use client";

import { useState } from "react";
import { t } from "@/i18n/en";

export function AppHeader({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/o/${orderId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <header className="flex flex-col items-start gap-3 border-b border-neutral-300 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          className="h-12 w-12 shrink-0 text-accent-filament sm:h-[69px] sm:w-[69px]"
          aria-hidden="true"
        >
          <path d="M56.93,66.1h-7.2a1,1,0,1,0,0,2h7v2.79H42.64V68.07h2.49a1,1,0,0,0,0-2H42.42a1.75,1.75,0,0,0-1.75,1.76v3.21a1.75,1.75,0,0,0,1.75,1.76H56.93a1.76,1.76,0,0,0,1.76-1.76V67.86a1.76,1.76,0,0,0-1.76-1.76Z" />
          <path d="M45.58,47.18a3.28,3.28,0,1,0,3.28,3.28A3.28,3.28,0,0,0,45.58,47.18Zm0,4.59a1.32,1.32,0,1,1,1.31-1.31A1.31,1.31,0,0,1,45.58,51.77Z" />
          <path d="M53.77,47.18a3.28,3.28,0,1,0,3.28,3.28A3.28,3.28,0,0,0,53.77,47.18Zm0,4.59a1.32,1.32,0,1,1,1.31-1.31A1.31,1.31,0,0,1,53.77,51.77Z" />
          <path d="M79.11,75.35H68.36V72.21a4.32,4.32,0,0,0,1.2-3,4.36,4.36,0,0,0-4.36-4.36h-1v-.22A3.23,3.23,0,0,0,61,61.4H55.21V59.28H57a3.91,3.91,0,0,0,3.91-3.91V54.21h1.78a2.07,2.07,0,0,0,2.07-2.07V48.78a2.08,2.08,0,0,0-2.07-2.08H60.89V46A3.91,3.91,0,0,0,57,42.07H42.37A3.92,3.92,0,0,0,38.46,46v.72H36.69a2.08,2.08,0,0,0-2.08,2.08v3.36a2.08,2.08,0,0,0,2.08,2.07h1.77v1.16a3.92,3.92,0,0,0,3.91,3.91h1.77V61.4H38.33a3.23,3.23,0,0,0-3.23,3.22v.22h-.94A4.36,4.36,0,0,0,31,72.21v3.14H20.24a4.17,4.17,0,1,0,0,8.34H79.11a4.17,4.17,0,0,0,0-8.34ZM60.89,48.67h1.78a.11.11,0,0,1,.11.11v3.36a.11.11,0,0,1-.11.11H60.89ZM38.46,52.25H36.69a.11.11,0,0,1-.11-.11V48.78a.11.11,0,0,1,.11-.11h1.77ZM64.25,66.81h1a2.4,2.4,0,0,1,0,4.79h-1Zm0,6.76h1a4.28,4.28,0,0,0,1.19-.17v1.95H64.25ZM42.37,57.31a1.94,1.94,0,0,1-1.94-1.94V46A1.94,1.94,0,0,1,42.37,44H57A1.94,1.94,0,0,1,58.92,46v9.39A1.94,1.94,0,0,1,57,57.31Zm10.87,2V61.4H46.11V59.28ZM37.07,64.62a1.26,1.26,0,0,1,1.26-1.25H61a1.25,1.25,0,0,1,1.25,1.25V75.35H37.07Zm-2.91,2.19h.94V71.6h-.94a2.4,2.4,0,1,1,0-4.79Zm.94,6.76v1.78H33V73.4a4.3,4.3,0,0,0,1.2.17Zm44,8.15H20.24a2.2,2.2,0,1,1,0-4.4H79.11a2.2,2.2,0,0,1,0,4.4Z" />
          <path d="M79.6,23H56.41v0a1.94,1.94,0,0,0-1.94-1.94H50.66v-.37a4.15,4.15,0,0,0-4.15-4.15H30.79a4.15,4.15,0,0,0-4.15,4.15v7.74H19.75a1.71,1.71,0,0,1,0-3.42H23a1,1,0,1,0,0-2H19.75a3.68,3.68,0,0,0,0,7.36h.83v1.27a4,4,0,0,0,8,0V30.39H42.94v0a1.94,1.94,0,0,0,1.94,1.94h0l1.39,3.47a1.75,1.75,0,0,0,1.63,1.09h.78v1.8a1,1,0,1,0,2,0v-1.8h.79a1.74,1.74,0,0,0,1.62-1.09l1.4-3.47h0a1.94,1.94,0,0,0,1.93-1.94v0H79.6a3.68,3.68,0,1,0,0-7.36Zm-53,8.63a2,2,0,0,1-4.09,0V30.39h4.09ZM44.88,21.05A1.94,1.94,0,0,0,42.94,23v0H32.23a1,1,0,1,0,0,2H42.94v3.42H28.61V20.68a2.19,2.19,0,0,1,2.18-2.19H46.51a2.19,2.19,0,0,1,2.18,2.19v.37ZM51.3,35H48.05l-1-2.6h5.33Zm3.14-4.57H44.91V23h9.53Zm25.16-2H56.41V25H79.6a1.71,1.71,0,1,1,0,3.42Z" />
        </svg>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            {t.appTitle}
          </h1>
          <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase sm:text-sm">
            {t.appSubtitle}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleShare}
        className="hidden shrink-0 items-center gap-1.5 rounded border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-700 sm:flex"
      >
        {copied ? t.shareLinkCopied : t.shareLink}
      </button>
    </header>
  );
}
