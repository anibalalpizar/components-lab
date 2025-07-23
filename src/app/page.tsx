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

  const handleUpdateComponents = (newComponents: EditorComponent[]) => {
    setComponents(newComponents)

    // Update selected component if it still exists
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
    <div className="h-screen flex bg-gray-100">
      {/* Component Palette */}
      <ComponentPalette />

      {/* Canvas */}
      <Canvas
        components={components}
        selectedComponent={selectedComponent}
        onUpdateComponents={handleUpdateComponents}
        onSelectComponent={handleSelectComponent}
      />

      {/* Properties Panel */}
      <PropertiesPanel
        selectedComponent={selectedComponent}
        onUpdateComponent={handleUpdateComponent}
      />

      {/* Code Preview */}
      <CodePreview components={components} />
    </div>
  )
}
