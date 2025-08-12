"use client"

import type { EditorComponent } from "../types/editor"
import { generateTSXCode } from "../utils/codeGenerator"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

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

  const customDarkTheme = {
    ...oneDark,
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: "transparent",
      textShadow: "none",
    },
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: "transparent",
      textShadow: "none",
    },
    // Remove any selection/highlight colors
    ':not(pre) > code[class*="language-"]': {
      background: "transparent",
    },
  }

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Generated Code
        </h3>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded text-xs font-medium transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-card">
        <SyntaxHighlighter
          language="tsx"
          style={customDarkTheme}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "12px",
            lineHeight: "1.4",
            background: "transparent",
            textShadow: "none",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
          showLineNumbers={true}
          wrapLines={true}
          wrapLongLines={true}
          lineProps={{
            style: { display: "block", background: "transparent" },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
