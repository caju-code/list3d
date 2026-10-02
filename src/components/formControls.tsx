export function inputClass(hasError: boolean) {
  return `min-h-10 w-full rounded-md border px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-zinc-200 focus:ring-accent-filament/30"
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
      <span className="font-medium text-zinc-700">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
