// components/BlockList.tsx
"use client";
import {useTranslations} from 'next-intl';
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableBlock from "./SortableBlock";
import BlockRenderer from "./blocks/BlockRenderer";
// import {RaccoonLoader}  from "raccoon-loader"; // 👈 Import the loader
// import 'raccoon-loader/dist/Raccoonloader.css'; // 👈 Make sure to import the CSS
let idCounter = 1;

type Block = {
  id: string;
  type: string;
  data: any;
};

export default function BlockList() {
  const [loading, setLoading] = useState(false);

    // const t = useTranslations();
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "block-0", type: "text", data: { content: "Welcome!" } },
  ]);

const handleAddBlock = (type: string) => {
  setLoading(true);

  setTimeout(() => {
    const newId = `block-${idCounter++}`;
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: newId, type, data: getDefaultBlockData(type) },
    ]);
    setLoading(false);
  }, 500); // Delay in ms (adjust as needed)
};

  const getDefaultBlockData = (type: string) => {
    switch (type) {
      case "text":
        return { content: "NEW_TEXT_BLOCK"};
      case "image":
        return { url: "", alt: "" };
      case "quote":
        return { text: "QUOTE_TEXT"};
      case "flashcard":
        return { front: "", back: "" };
      default:
        return {};
    }
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      return arrayMove(prev, index, newIndex);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        onClick={() => handleAddBlock("text")}
        style={{
        backgroundColor: "#3b82f6",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        }}
      >
        + 'TEXT_BLOCK_TITLE'
      </button>
      <button
        onClick={() => handleAddBlock("image")}
        style={{
        backgroundColor: "#22c55e",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        }}
      >
        + Image Block
      </button>
      <button
        onClick={() => handleAddBlock("quote")}
        style={{
        backgroundColor: "#fde047",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        }}
      >
        + Quote Block
      </button>
<button
  onClick={() => handleAddBlock("flashcard")}
  style={{
    backgroundColor: "#a855f7",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
  }}
>
  + Flashcard Block
</button>

      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return;

          const oldIndex = blocks.findIndex((b) => b.id === active.id);
          const newIndex = blocks.findIndex((b) => b.id === over.id);

          setBlocks((items) => arrayMove(items, oldIndex, newIndex));
        }}
      >
        <SortableContext
          key={blocks.map((b) => b.id).join("-")}
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block, index) => (
            <SortableBlock
              key={block.id}

              id={block.id}
              onMove={moveBlock}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
            >

<BlockRenderer
      type={block.type}
      data={block.data}
      onChange={(newData) => {
        setBlocks((prev) =>
          prev.map((b) => (b.id === block.id ? { ...b, data: newData } : b))
        );
      }}
    />


            </SortableBlock>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
