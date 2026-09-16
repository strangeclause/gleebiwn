import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "please log in before creating an order."
      },
      { status: 401 }
    );
  }

  const body = await request.json();

  const itemType = body.itemType;
  const itemId = Number(body.itemId);
  const quantity = Number(body.quantity || 1);

  if (
    !["stuff", "joki"].includes(itemType) ||
    !Number.isInteger(itemId) ||
    quantity < 1
  ) {
    return NextResponse.json(
      { error: "invalid order." },
      { status: 400 }
    );
  }

  let item;

  if (itemType === "stuff") {
    const { data } = await supabase
      .from("products")
      .select("id,name,price,stock")
      .eq("id", itemId)
      .eq("active", true)
      .maybeSingle();

    item = data;

    if (!item || item.stock < quantity) {
      return NextResponse.json(
        { error: "not enough stock." },
        { status: 400 }
      );
    }
  }

  if (itemType === "joki") {
    const { data } = await supabase
      .from("services")
      .select("id,name,price")
      .eq("id", itemId)
      .eq("active", true)
      .maybeSingle();

    item = data;
  }

  if (!item) {
    return NextResponse.json(
      { error: "item not found." },
      { status: 404 }
    );
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      item_type: itemType,
      product_id:
        itemType === "stuff" ? item.id : null,
      service_id:
        itemType === "joki" ? item.id : null,
      item_name: item.name,
      quantity,
      total_price: item.price,
      payment_method: "qris",
      payment_status: "unpaid",
      order_status: "pending"
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    order
  });
}