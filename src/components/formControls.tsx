export function inputClass(hasError: boolean) {
  return `min-h-10 w-full rounded-md border px-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-accent-filament focus:ring-accent-filament/50"
      : "border-neutral-200 focus:ring-accent-filament/30"
  }`;
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-neutral-700">{label}</span>
      {children}
      {error && <span className="text-xs text-accent-filament">{error}</span>}
    </label>
  );
}
