"use client"

import type React from "react"

import type { DragItem } from "../types/editor"

const COMPONENT_TYPES = [
  { type: "button", label: "Button", icon: "🔘" },
  { type: "input", label: "Input", icon: "📝" },
  { type: "text", label: "Text", icon: "📄" },
  { type: "image", label: "Image", icon: "🖼️" },
  { type: "div", label: "Div", icon: "📦" },
  { type: "card", label: "Card", icon: "🃏" },
  { type: "grid", label: "Grid", icon: "⚏" },
]

export default function ComponentPalette() {
  const handleDragStart = (e: React.DragEvent, type: string) => {
    const dragData: DragItem = { type, isNew: true }
    e.dataTransfer.setData("application/json", JSON.stringify(dragData))
  }

  return (
    <div className="w-64 bg-black border-r border-gray-800 p-4">
      <h3 className="text-sm font-medium mb-4 text-gray-300 uppercase tracking-wide">
        Components
      </h3>
      <div className="space-y-2">
        {COMPONENT_TYPES.map(({ type, label, icon }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg cursor-move hover:bg-gray-800 hover:border-gray-700 transition-all duration-200"
          >
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-medium text-white">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
