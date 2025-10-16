"use client";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Cart from "@/components/Cart";
import { useState } from "react";
import { FileItemType, folders, FolderType } from "@/data/folder";
import { CartProvider, useCart } from "@/context/CartContext";

function Content() {
  const [folderStack, setFolderStack] = useState<FolderType[]>([]);
  const currentFolder = folderStack[folderStack.length - 1] || null;
  const { addToCart, isInCart } = useCart();

  // ✅ Go inside folder
  const handleSelectFolder = (folder: FolderType) => {
    setFolderStack((prev) => [...prev, folder]);
  };

  // ✅ Go back to previous folder (not home)
  const goBack = () => {
    setFolderStack((prev) => prev.slice(0, -1));
  };

  // ✅ Handle what to show in main area
  const renderMainContent = () => {
    // ─────────────── Default empty view ───────────────
    if (!currentFolder) {
      return (
        <div className="text-gray-500 text-center mt-20 text-lg">
          👈 Please select a folder to view its contents
        </div>
      );
    }

    // ─────────────── Folder header ───────────────
    const FolderHeader = (
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">{currentFolder.name}</h2>
          {folderStack.length > 0 && (
            <button
              onClick={goBack}
              className="text-blue-600 text-sm hover:underline"
            >
              ← Back
            </button>
          )}
        </div>

        {currentFolder.recordCount && (
          <p className="text-gray-600 text-sm mt-1">
            {currentFolder.recordCount.toLocaleString()} records
          </p>
        )}
      </div>
    );

    // ─────────────── Show subfolders ───────────────
    if (currentFolder.subfolders && currentFolder.subfolders.length > 0) {
      return (
        <>
          {FolderHeader}
          <div className="grid grid-cols-1  gap-4">
            {currentFolder.subfolders.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleSelectFolder(sub)}
                className="flex items-center justify-between border border-gray-200 hover:border-blue-400 shadow-sm rounded-xl p-5 cursor-pointer bg-white hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">📁 {sub.name}</p>
                  {sub.recordCount && (
                    <p className="text-sm text-gray-500 mt-1">
                      {sub.recordCount.toLocaleString()} records
                    </p>
                  )}
                </div>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        </>
      );
    }

    // ─────────────── Show files ───────────────
    if (currentFolder.files && currentFolder.files.length > 0) {
      return (
        <>
          {FolderHeader}
          <div className="grid grid-cols-1 gap-4">
            {currentFolder.files.map((file: FileItemType) => {
              const alreadyInCart = isInCart(file.id);
              return (
                <div
                  key={file.id}
                  className="border border-gray-200 p-4 rounded shadow hover:shadow-md transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-sm text-gray-600">${file.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(file)}
                    disabled={alreadyInCart}
                    className={`px-3 py-1 rounded text-sm ${
                      alreadyInCart
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {alreadyInCart ? "Added" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      );
    }

    // ─────────────── Empty folder ───────────────
    return (
      <div className="text-gray-500 text-center mt-20 text-lg">
        This folder is empty
      </div>
    );
  };

  return (
    <>
      <Sidebar folders={folders} onSelectFolder={handleSelectFolder} />
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        {renderMainContent()}
      </main>
      <Cart />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col lg:flex-row overflow-hidden">
        <CartProvider>
          <Content />
        </CartProvider>
      </body>
    </html>
  );
}
