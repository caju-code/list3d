import { NextResponse } from "next/server";
import { createOrder } from "@/server/db";
import { ORDER_ID_COOKIE } from "@/server/cookies";

export async function GET(request: Request): Promise<Response> {
  const order = await createOrder();
  const response = NextResponse.redirect(new URL(`/o/${order.id}`, request.url));
  response.cookies.set(ORDER_ID_COOKIE, order.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
