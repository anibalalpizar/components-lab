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
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Components</h3>
      <div className="space-y-2">
        {COMPONENT_TYPES.map(({ type, label, icon }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
