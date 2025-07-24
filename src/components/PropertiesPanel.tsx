"use client"

import type { EditorComponent } from "../types/editor"

interface PropertiesPanelProps {
  selectedComponent: EditorComponent | null
  onUpdateComponent: (id: string, updates: Partial<EditorComponent>) => void
}

export default function PropertiesPanel({
  selectedComponent,
  onUpdateComponent,
}: PropertiesPanelProps) {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Properties</h3>
        <p className="text-gray-500 text-sm">
          Select a component to edit its properties
        </p>
      </div>
    )
  }

  const updateStyle = (key: string, value: string) => {
    onUpdateComponent(selectedComponent.id, {
      style: { ...selectedComponent.style, [key]: value },
    })
  }

  const updateProps = (key: string, value: string) => {
    onUpdateComponent(selectedComponent.id, {
      props: { ...selectedComponent.props, [key]: value },
    })
  }

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Properties</h3>

      <div className="space-y-4">
        <div className="bg-white p-3 rounded-lg border">
          <h4 className="font-medium text-gray-700 mb-2">
            Component: {selectedComponent.type}
          </h4>
          <p className="text-xs text-gray-500">ID: {selectedComponent.id}</p>
        </div>

        {/* Component-specific properties */}
        {(selectedComponent.type === "button" ||
          selectedComponent.type === "text") && (
          <div className="bg-white p-3 rounded-lg border">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text
            </label>
            <input
              type="text"
              value={selectedComponent.props.text || ""}
              onChange={(e) => updateProps("text", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}

        {selectedComponent.type === "input" && (
          <div className="bg-white p-3 rounded-lg border">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={selectedComponent.props.placeholder || ""}
              onChange={(e) => updateProps("placeholder", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        )}

        {selectedComponent.type === "image" && (
          <div className="bg-white p-3 rounded-lg border space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={selectedComponent.props.src || ""}
                onChange={(e) => updateProps("src", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={selectedComponent.props.alt || ""}
                onChange={(e) => updateProps("alt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        )}

        {/* Style properties */}
        <div className="bg-white p-3 rounded-lg border space-y-3">
          <h4 className="font-medium text-gray-700">Dimensions</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Width
              </label>
              <input
                type="text"
                value={selectedComponent.style.width || ""}
                onChange={(e) => updateStyle("width", e.target.value)}
                placeholder="auto"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Height
              </label>
              <input
                type="text"
                value={selectedComponent.style.height || ""}
                onChange={(e) => updateStyle("height", e.target.value)}
                placeholder="auto"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border space-y-3">
          <h4 className="font-medium text-gray-700">Colors</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Background
              </label>
              <input
                type="color"
                value={selectedComponent.style.backgroundColor || "#ffffff"}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                className="w-full h-8 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={selectedComponent.style.color || "#000000"}
                onChange={(e) => updateStyle("color", e.target.value)}
                className="w-full h-8 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border space-y-3">
          <h4 className="font-medium text-gray-700">Spacing</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Padding
              </label>
              <input
                type="text"
                value={selectedComponent.style.padding || ""}
                onChange={(e) => updateStyle("padding", e.target.value)}
                placeholder="8px"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Margin
              </label>
              <input
                type="text"
                value={selectedComponent.style.margin || ""}
                onChange={(e) => updateStyle("margin", e.target.value)}
                placeholder="4px"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {(selectedComponent.type === "div" ||
          selectedComponent.type === "card" ||
          selectedComponent.type === "grid") && (
          <div className="bg-white p-3 rounded-lg border space-y-3">
            <h4 className="font-medium text-gray-700">Layout</h4>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Display
              </label>
              <select
                value={selectedComponent.style.display || "block"}
                onChange={(e) => updateStyle("display", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
              </select>
            </div>

            {selectedComponent.style.display === "flex" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Direction
                  </label>
                  <select
                    value={selectedComponent.style.flexDirection || "row"}
                    onChange={(e) =>
                      updateStyle("flexDirection", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Justify
                  </label>
                  <select
                    value={
                      selectedComponent.style.justifyContent || "flex-start"
                    }
                    onChange={(e) =>
                      updateStyle("justifyContent", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
