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
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm"></div>
          </div>
          <h1 className="text-lg font-medium text-white">
            Visual Component Editor
          </h1>
        </div>
        <button
          onClick={() => setShowCodePreview(!showCodePreview)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
            showCodePreview
              ? "bg-white text-black border-white hover:bg-gray-100"
              : "bg-black text-white border-gray-700 hover:border-gray-600 hover:bg-gray-900"
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
