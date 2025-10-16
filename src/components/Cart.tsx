"use client";

import { useCart } from "@/context/CartContext";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function Cart() {

    const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <aside className="lg:w-1/4 min-w-[250px] bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">No items yet</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × ${item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                <MdDeleteOutline size={24}/>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 border-t pt-4">
        <p className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>${total}</span>
        </p>
        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Checkout
        </button>
      </div>
    </aside>
  );
}
