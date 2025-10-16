"use client";

import React from "react";
import { FileItemType } from "@/data/folder";
import { useCart } from "@/context/CartContext";

export default function FileCard({ file }: { file: FileItemType }) {
  const { addToCart } = useCart();
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition cursor-pointer">
      <p className="font-semibold mb-2">{file.name}</p>
      <p className="text-sm text-gray-600 mb-2">${file.price}</p>
      <button
        onClick={() => addToCart(file)}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
