"use client";

import { createOrderIntent } from "@/lib/x";

type Props = {
  name: string;
  price: string;
  stock: number;
};

export default function OrderButton({
  name,
  price,
  stock
}: Props) {
  if (stock <= 0) {
    return (
      <span className="order-button disabled">
        sold out <span>×</span>
      </span>
    );
  }

  const url = createOrderIntent(name, price);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="order-button"
    >
      order this <span>↗</span>
    </a>
  );
}