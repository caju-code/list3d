const PRICE_PATTERN = /^(\d+)([.,](\d{1,2}))?$/;

export function parsePriceToCents(input: string): number | null {
  const trimmed = input.trim();
  const match = PRICE_PATTERN.exec(trimmed);
  if (!match) return null;

  const [, whole, , fraction] = match;
  const cents = fraction ? fraction.padEnd(2, "0") : "00";
  return Number(whole) * 100 + Number(cents);
}

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatBRL(cents: number): string {
  return brlFormatter.format(cents / 100);
}
