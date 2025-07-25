"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import type { EditorComponent } from "../types/editor"
import { generateTSXCode } from "../utils/codeGenerator"

interface CodePreviewProps {
  components: EditorComponent[]
}

export default function CodePreview({ components }: CodePreviewProps) {
  const code = generateTSXCode(components)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      // You could add a toast notification here instead of alert
      alert("Code copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="w-96 bg-black border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
          Generated Code
        </h3>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 bg-white text-black hover:bg-gray-100 rounded text-xs font-medium transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language="tsx"
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "12px",
            lineHeight: "1.4",
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
