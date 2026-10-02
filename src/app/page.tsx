import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOrder } from "@/server/db";

const ORDER_ID_COOKIE = "order-id";

export default async function Home() {
  const cookieStore = await cookies();
  const existingId = cookieStore.get(ORDER_ID_COOKIE)?.value;
  const existingOrder = existingId ? await getOrder(existingId) : null;

  if (existingOrder) {
    redirect(`/o/${existingOrder.id}`);
  }

  redirect("/new");
}
