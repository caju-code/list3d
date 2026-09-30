import { describe, expect, it } from "vitest";
import { formatBRL, parsePriceToCents } from "./money";

describe("parsePriceToCents", () => {
  it("parses a comma-decimal value", () => {
    expect(parsePriceToCents("12,50")).toBe(1250);
  });

  it("parses a dot-decimal value", () => {
    expect(parsePriceToCents("12.50")).toBe(1250);
  });

  it("parses an integer value with no decimals", () => {
    expect(parsePriceToCents("10")).toBe(1000);
  });

  it("rounds instead of truncating float error", () => {
    expect(parsePriceToCents("0.29")).toBe(29);
    expect(parsePriceToCents("0.1")).toBe(10);
  });

  it("rejects empty input", () => {
    expect(parsePriceToCents("")).toBeNull();
    expect(parsePriceToCents("   ")).toBeNull();
  });

  it("rejects negative values", () => {
    expect(parsePriceToCents("-5")).toBeNull();
  });

  it("rejects more than two decimal places", () => {
    expect(parsePriceToCents("12.505")).toBeNull();
  });

  it("rejects non-numeric garbage", () => {
    expect(parsePriceToCents("abc")).toBeNull();
    expect(parsePriceToCents("12,50,00")).toBeNull();
  });
});

describe("formatBRL", () => {
  it("formats cents as pt-BR currency", () => {
    expect(formatBRL(1250)).toBe(`R$ 12,50`);
  });

  it("formats zero", () => {
    expect(formatBRL(0)).toBe(`R$ 0,00`);
  });

  it("formats thousands with a dot separator", () => {
    expect(formatBRL(123456)).toBe(`R$ 1.234,56`);
  });
});
