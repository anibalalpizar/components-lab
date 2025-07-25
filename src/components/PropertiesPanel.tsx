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
      <div className="w-80 bg-black border-l border-gray-800 p-4">
        <h3 className="text-sm font-medium mb-4 text-gray-300 uppercase tracking-wide">
          Properties
        </h3>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-800 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-500">⚙️</span>
          </div>
          <p className="text-gray-400 text-sm">
            Select a component to edit its properties
          </p>
        </div>
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
    <div className="w-80 bg-black border-l border-gray-800 p-4 overflow-y-auto">
      <h3 className="text-sm font-medium mb-4 text-gray-300 uppercase tracking-wide">
        Properties
      </h3>

      <div className="space-y-4">
        <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
          <h4 className="font-medium text-white mb-2 text-sm">
            {selectedComponent.type.toUpperCase()}
          </h4>
          <p className="text-xs text-gray-500 font-mono">
            ID: {selectedComponent.id}
          </p>
        </div>

        {/* Component-specific properties */}
        {(selectedComponent.type === "button" ||
          selectedComponent.type === "text") && (
          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
            <label className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wide">
              Text
            </label>
            <input
              type="text"
              value={selectedComponent.props.text || ""}
              onChange={(e) => updateProps("text", e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none"
              placeholder="Enter text..."
            />
          </div>
        )}

        {selectedComponent.type === "input" && (
          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
            <label className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wide">
              Placeholder
            </label>
            <input
              type="text"
              value={selectedComponent.props.placeholder || ""}
              onChange={(e) => updateProps("placeholder", e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none"
              placeholder="Enter placeholder..."
            />
          </div>
        )}

        {selectedComponent.type === "image" && (
          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wide">
                Image URL
              </label>
              <input
                type="text"
                value={selectedComponent.props.src || ""}
                onChange={(e) => updateProps("src", e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2 uppercase tracking-wide">
                Alt Text
              </label>
              <input
                type="text"
                value={selectedComponent.props.alt || ""}
                onChange={(e) => updateProps("alt", e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:border-gray-600 focus:outline-none"
                placeholder="Image description..."
              />
            </div>
          </div>
        )}

        {/* Style properties */}
        <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-3">
          <h4 className="font-medium text-white text-sm">Dimensions</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Width
              </label>
              <input
                type="text"
                value={selectedComponent.style.width || ""}
                onChange={(e) => updateStyle("width", e.target.value)}
                placeholder="auto"
                className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Height
              </label>
              <input
                type="text"
                value={selectedComponent.style.height || ""}
                onChange={(e) => updateStyle("height", e.target.value)}
                placeholder="auto"
                className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-3">
          <h4 className="font-medium text-white text-sm">Colors</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Background
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedComponent.style.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    updateStyle("backgroundColor", e.target.value)
                  }
                  className="w-10 h-8 border border-gray-700 rounded bg-black"
                />
                <input
                  type="text"
                  value={selectedComponent.style.backgroundColor || ""}
                  onChange={(e) =>
                    updateStyle("backgroundColor", e.target.value)
                  }
                  placeholder="#ffffff"
                  className="flex-1 px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedComponent.style.color || "#000000"}
                  onChange={(e) => updateStyle("color", e.target.value)}
                  className="w-10 h-8 border border-gray-700 rounded bg-black"
                />
                <input
                  type="text"
                  value={selectedComponent.style.color || ""}
                  onChange={(e) => updateStyle("color", e.target.value)}
                  placeholder="#000000"
                  className="flex-1 px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-3">
          <h4 className="font-medium text-white text-sm">Spacing</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Padding
              </label>
              <input
                type="text"
                value={selectedComponent.style.padding || ""}
                onChange={(e) => updateStyle("padding", e.target.value)}
                placeholder="8px"
                className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Margin
              </label>
              <input
                type="text"
                value={selectedComponent.style.margin || ""}
                onChange={(e) => updateStyle("margin", e.target.value)}
                placeholder="4px"
                className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {(selectedComponent.type === "div" ||
          selectedComponent.type === "card" ||
          selectedComponent.type === "grid") && (
          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-3">
            <h4 className="font-medium text-white text-sm">Layout</h4>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Display
              </label>
              <select
                value={selectedComponent.style.display || "block"}
                onChange={(e) => updateStyle("display", e.target.value)}
                className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white focus:border-gray-600 focus:outline-none"
              >
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
              </select>
            </div>

            {selectedComponent.style.display === "flex" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Direction
                  </label>
                  <select
                    value={selectedComponent.style.flexDirection || "row"}
                    onChange={(e) =>
                      updateStyle("flexDirection", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white focus:border-gray-600 focus:outline-none"
                  >
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Justify
                  </label>
                  <select
                    value={
                      selectedComponent.style.justifyContent || "flex-start"
                    }
                    onChange={(e) =>
                      updateStyle("justifyContent", e.target.value)
                    }
                    className="w-full px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white focus:border-gray-600 focus:outline-none"
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
