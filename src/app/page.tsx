import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOrder } from "@/server/db";
import { ORDER_ID_COOKIE } from "@/server/cookies";

export default async function Home() {
  const cookieStore = await cookies();
  const existingId = cookieStore.get(ORDER_ID_COOKIE)?.value;
  const existingOrder = existingId ? await getOrder(existingId) : null;

  if (existingOrder) {
    redirect(`/o/${existingOrder.id}`);
  }

  redirect("/new");
}
