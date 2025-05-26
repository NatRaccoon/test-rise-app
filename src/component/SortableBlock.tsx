"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoveUp, MoveDown, GripVertical } from "lucide-react";
import React from "react";

export default function SortableBlock({
  id,
  onMove,
  isFirst,
  isLast,
  children,
}: {
  id: string;
  onMove: (id: string, direction: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
      ...style,
      background: "white",
      padding: "16px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "flex-start",
      gap: "16px",
      }}
    >
      {/* Drag Handle */}
      <div
      style={{
        cursor: "grab",
        color: "#6b7280",
        paddingTop: "4px",
      }}
      {...attributes}
      {...listeners}
      >
      <GripVertical />
      </div>

      {/* Dynamic Block Content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Up/Down Buttons */}
      <div style={{ display: "flex", gap: "8px", paddingTop: "4px" }}>
      <button
        onClick={(e) => {
        e.stopPropagation();
        onMove(id, "up");
        }}
        disabled={isFirst}
        style={{
        padding: "4px",
        opacity: isFirst ? 0.3 : 1,
        color: "black",
        background: "none",
        border: "none",
        cursor: isFirst ? "not-allowed" : "pointer",
        }}
      >
        <MoveUp size={18} />
      </button>
      <button
        onClick={(e) => {
        e.stopPropagation();
        onMove(id, "down");
        }}
        disabled={isLast}
        style={{
        padding: "4px",
        opacity: isLast ? 0.3 : 1,
        color: "black",
        background: "none",
        border: "none",
        cursor: isLast ? "not-allowed" : "pointer",
        }}
      >
        <MoveDown size={18} />
      </button>
      </div>
    </div>
  );
}
