"use client"

import type { EditorComponent } from "../types/editor"
import { generateTSXCode } from "../utils/codeGenerator"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodePreviewProps {
  components: EditorComponent[]
}

export default function CodePreview({ components }: CodePreviewProps) {
  const code = generateTSXCode(components)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      alert("Code copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="w-96 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Generated Code</h3>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "14px",
            lineHeight: "1.5",
            background: "transparent",
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
