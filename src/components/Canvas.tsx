"use client"

import type { EditorComponent, DragItem } from "../types/editor"
import { createNewComponent } from "../utils/dragDrop"
import type React from "react"

interface CanvasProps {
  components: EditorComponent[]
  selectedComponent: EditorComponent | null
  onUpdateComponents: (components: EditorComponent[]) => void
  onSelectComponent: (component: EditorComponent | null) => void
}

export default function Canvas({
  components,
  selectedComponent,
  onUpdateComponents,
  onSelectComponent,
}: CanvasProps) {
  const handleDrop = (e: React.DragEvent, targetId?: string) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const dragData: DragItem = JSON.parse(
        e.dataTransfer.getData("application/json")
      )

      if (dragData.isNew) {
        // Create new component
        const newComponent = createNewComponent(dragData.type)

        if (targetId) {
          // Add to specific container
          const updatedComponents = addComponentToContainer(
            components,
            targetId,
            newComponent
          )
          onUpdateComponents(updatedComponents)
        } else {
          // Add to root
          onUpdateComponents([...components, newComponent])
        }
      } else if (dragData.component) {
        // Move existing component
        const { component } = dragData
        let updatedComponents = removeComponentFromTree(
          components,
          component.id
        )

        if (targetId) {
          updatedComponents = addComponentToContainer(
            updatedComponents,
            targetId,
            component
          )
        } else {
          updatedComponents = [...updatedComponents, component]
        }

        onUpdateComponents(updatedComponents)
      }
    } catch (error) {
      console.error("Error handling drop:", error)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const addComponentToContainer = (
    components: EditorComponent[],
    containerId: string,
    newComponent: EditorComponent
  ): EditorComponent[] => {
    return components.map((component) => {
      if (component.id === containerId) {
        return {
          ...component,
          children: [
            ...component.children,
            { ...newComponent, parentId: containerId },
          ],
        }
      }
      return {
        ...component,
        children: addComponentToContainer(
          component.children,
          containerId,
          newComponent
        ),
      }
    })
  }

  const removeComponentFromTree = (
    components: EditorComponent[],
    componentId: string
  ): EditorComponent[] => {
    return components.filter((component) => {
      if (component.id === componentId) {
        return false
      }
      component.children = removeComponentFromTree(
        component.children,
        componentId
      )
      return true
    })
  }

  const handleComponentClick = (
    e: React.MouseEvent,
    component: EditorComponent
  ) => {
    e.stopPropagation()
    onSelectComponent(component)
  }

  const handleComponentDragStart = (
    e: React.DragEvent,
    component: EditorComponent
  ) => {
    const dragData: DragItem = { type: component.type, component, isNew: false }
    e.dataTransfer.setData("application/json", JSON.stringify(dragData))
  }

  const renderComponent = (component: EditorComponent): React.JSX.Element => {
    const isSelected = selectedComponent?.id === component.id
    const canHaveChildren = ["div", "card", "grid"].includes(component.type)

    const baseClasses = `relative ${isSelected ? "ring-2 ring-blue-500" : ""} ${
      canHaveChildren ? "min-h-[50px]" : ""
    }`

    const style: React.CSSProperties = {
      ...component.style,
      cursor: "pointer",
    }

    const commonProps = {
      style,
      className: baseClasses,
      onClick: (e: React.MouseEvent) => handleComponentClick(e, component),
      draggable: true,
      onDragStart: (e: React.DragEvent) =>
        handleComponentDragStart(e, component),
    }

    switch (component.type) {
      case "button":
        return (
          <button key={component.id} {...commonProps}>
            {component.props.text || "Button"}
          </button>
        )

      case "input":
        return (
          <input
            key={component.id}
            {...commonProps}
            type={component.props.type || "text"}
            placeholder={component.props.placeholder}
          />
        )

      case "text":
        return (
          <span key={component.id} {...commonProps}>
            {component.props.text || "Text Element"}
          </span>
        )

      case "image":
        return (
          <img
            key={component.id}
            {...commonProps}
            src={
              component.props.src ||
              "/placeholder.svg?height=100&width=100&text=Image"
            }
            alt={component.props.alt || "Image"}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        )

      case "div":
      case "card":
      case "grid":
        return (
          <div
            key={component.id}
            {...commonProps}
            onDrop={(e) => handleDrop(e, component.id)}
            onDragOver={handleDragOver}
          >
            {component.children.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm pointer-events-none">
                Drop components here
              </div>
            )}
            {component.children.map((child) => renderComponent(child))}
          </div>
        )

      default:
        return (
          <div key={component.id} {...commonProps}>
            Unknown Component
          </div>
        )
    }
  }

  return (
    <div
      className="flex-1 bg-white p-8 overflow-auto"
      onDrop={(e) => handleDrop(e)}
      onDragOver={handleDragOver}
      onClick={() => onSelectComponent(null)}
    >
      <div className="min-h-full border-2 border-dashed border-gray-300 rounded-lg p-4">
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <div className="text-center">
              <p className="text-lg mb-2">Canvas is empty</p>
              <p className="text-sm">
                Drag components from the left panel to start building
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {components.map((component) => renderComponent(component))}
          </div>
        )}
      </div>
    </div>
  )
}
