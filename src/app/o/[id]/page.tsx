import { notFound } from "next/navigation";
import { getOrder } from "@/server/db";
import { OrderApp } from "./OrderApp";

export default async function OrderPage(props: PageProps<"/o/[id]">) {
  const { id } = await props.params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return <OrderApp id={id} initialOrder={order} />;
}
