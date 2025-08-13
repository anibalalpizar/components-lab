"use client"

import { useState } from "react"
import type { EditorComponent } from "../types/editor"
import { findComponentById, removeComponentById } from "../utils/dragDrop"
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

  const handleDeleteComponent = (id: string) => {
    const updatedComponents = removeComponentById(components, id)
    setComponents(updatedComponents)
    setSelectedComponent(null) // Clear selection after deletion
  }

  const handleSelectComponent = (component: EditorComponent | null) => {
    setSelectedComponent(component)
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header with controls */}
      <div className="bg-background border-b border-border px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-foreground rounded-sm"></div>
          </div>
          <h1 className="text-lg font-medium text-foreground">
            Visual Component Editor
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCodePreview(!showCodePreview)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
              showCodePreview
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                : "bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {showCodePreview ? "Hide Code" : "Show Code"}
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 flex">
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
          onDeleteComponent={handleDeleteComponent}
        />

        {/* Code Preview - conditionally rendered */}
        {showCodePreview && <CodePreview components={components} />}
      </div>
    </div>
  )
}
