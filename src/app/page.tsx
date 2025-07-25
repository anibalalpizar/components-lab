"use client"

import { useState } from "react"
import type { EditorComponent } from "../types/editor"
import { findComponentById } from "../utils/dragDrop"
import ComponentPalette from "../components/ComponentPalette"
import Canvas from "../components/Canvas"
import PropertiesPanel from "../components/PropertiesPanel"
import CodePreview from "../components/CodePreview"

export default function VisualEditor() {
  const [components, setComponents] = useState<EditorComponent[]>([])
  const [selectedComponent, setSelectedComponent] =
    useState<EditorComponent | null>(null)
  const [showCodePreview, setShowCodePreview] = useState(false)

  const handleUpdateComponents = (newComponents: EditorComponent[]) => {
    setComponents(newComponents)

    if (selectedComponent) {
      const updatedSelected = findComponentById(
        newComponents,
        selectedComponent.id
      )
      setSelectedComponent(updatedSelected)
    }
  }

  const handleUpdateComponent = (
    id: string,
    updates: Partial<EditorComponent>
  ) => {
    const updateComponentInTree = (
      components: EditorComponent[]
    ): EditorComponent[] => {
      return components.map((component) => {
        if (component.id === id) {
          const updatedComponent = { ...component, ...updates }
          setSelectedComponent(updatedComponent)
          return updatedComponent
        }
        return {
          ...component,
          children: updateComponentInTree(component.children),
        }
      })
    }

    setComponents(updateComponentInTree(components))
  }

  const handleSelectComponent = (component: EditorComponent | null) => {
    setSelectedComponent(component)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Visual Component Editor
        </h1>
        <button
          onClick={() => setShowCodePreview(!showCodePreview)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showCodePreview
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {showCodePreview ? "Hide Code" : "Show Code"}
        </button>
      </div>

      <div className="flex-1 flex">
        <ComponentPalette />

        <Canvas
          components={components}
          selectedComponent={selectedComponent}
          onUpdateComponents={handleUpdateComponents}
          onSelectComponent={handleSelectComponent}
        />

        <PropertiesPanel
          selectedComponent={selectedComponent}
          onUpdateComponent={handleUpdateComponent}
        />

        {showCodePreview && <CodePreview components={components} />}
      </div>
    </div>
  )
}
