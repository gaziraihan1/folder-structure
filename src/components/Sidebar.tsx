"use client";
import React, { useState } from "react";
import { FolderType } from "@/data/folder";

interface SidebarProps {
  folders: FolderType[];
  onSelectFolder: (folder: FolderType) => void;
}

export default function Sidebar({ folders, onSelectFolder }: SidebarProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const handleSelect = (folder: FolderType) => {
    setSelectedFolderId(folder.id);
    onSelectFolder(folder);
  };

  return (
    <aside className="w-full lg:w-1/5 min-w-[220px] bg-gray-100 border-r border-gray-200 p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 pt-2">
        FMS-Dashboard
      </h1>
      <h2 className="text-xl font-bold mb-4">📁 Category</h2>
      <ul className="space-y-2">
        {folders.map((folder) => (
          <li
            key={folder.id}
            onClick={() => handleSelect(folder)}
            className={`
              cursor-pointer rounded py-6 px-6 shadow-md
              hover:bg-gray-50
              ${selectedFolderId === folder.id ? "border-2 border-blue-500 bg-white" : ""}
            `}
          >
            📁 {folder.name} <br />
            <span className="text-[12px] text-[#666]">
              {` Records (${folder.recordCount || "0"})`}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
