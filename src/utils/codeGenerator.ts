"use client"

import type { EditorComponent, ComponentStyle } from "../types/editor"

const styleToTailwind = (style: ComponentStyle): string => {
  const classes: string[] = []

  // Width and Height
  if (style.width) {
    if (style.width.includes("px")) {
      classes.push(`w-[${style.width}]`)
    } else if (style.width === "100%") {
      classes.push("w-full")
    }
  }

  if (style.height) {
    if (style.height.includes("px")) {
      classes.push(`h-[${style.height}]`)
    } else if (style.height === "100%") {
      classes.push("h-full")
    }
  }

  // Background Color
  if (style.backgroundColor) {
    if (style.backgroundColor.startsWith("#")) {
      classes.push(`bg-[${style.backgroundColor}]`)
    }
  }

  // Text Color
  if (style.color) {
    if (style.color.startsWith("#")) {
      classes.push(`text-[${style.color}]`)
    }
  }

  // Font Size
  if (style.fontSize) {
    if (style.fontSize.includes("px")) {
      classes.push(`text-[${style.fontSize}]`)
    }
  }

  // Font Weight
  if (style.fontWeight) {
    classes.push(`font-${style.fontWeight}`)
  }

  // Padding
  if (style.padding) {
    if (style.padding.includes("px")) {
      classes.push(`p-[${style.padding}]`)
    }
  }

  // Margin
  if (style.margin) {
    if (style.margin.includes("px")) {
      classes.push(`m-[${style.margin}]`)
    }
  }

  // Border Radius
  if (style.borderRadius) {
    if (style.borderRadius.includes("px")) {
      classes.push(`rounded-[${style.borderRadius}]`)
    }
  }

  // Border
  if (style.border) {
    if (style.border.includes("1px solid")) {
      classes.push("border")
    } else if (style.border.includes("2px dashed")) {
      classes.push("border-2 border-dashed")
    }
  }

  // Text Alignment
  if (style.textAlign) {
    classes.push(`text-${style.textAlign}`)
  }

  // Display
  if (style.display === "flex") {
    classes.push("flex")
  } else if (style.display === "grid") {
    classes.push("grid")
  }

  // Flex Direction
  if (style.flexDirection === "column") {
    classes.push("flex-col")
  }

  // Justify Content
  if (style.justifyContent) {
    const justifyMap: Record<string, string> = {
      "flex-start": "justify-start",
      center: "justify-center",
      "flex-end": "justify-end",
      "space-between": "justify-between",
      "space-around": "justify-around",
    }
    if (justifyMap[style.justifyContent]) {
      classes.push(justifyMap[style.justifyContent])
    }
  }

  // Align Items
  if (style.alignItems) {
    const alignMap: Record<string, string> = {
      "flex-start": "items-start",
      center: "items-center",
      "flex-end": "items-end",
      stretch: "items-stretch",
    }
    if (alignMap[style.alignItems]) {
      classes.push(alignMap[style.alignItems])
    }
  }

  // Gap
  if (style.gap) {
    if (style.gap.includes("px")) {
      classes.push(`gap-[${style.gap}]`)
    }
  }

  // Grid Template Columns
  if (style.gridTemplateColumns) {
    if (style.gridTemplateColumns.includes("repeat(2, 1fr)")) {
      classes.push("grid-cols-2")
    }
  }

  // Box Shadow
  if (style.boxShadow) {
    classes.push("shadow")
  }

  return classes.join(" ")
}

const generateComponentCode = (
  component: EditorComponent,
  indent = 0
): string => {
  const indentStr = "  ".repeat(indent)
  const className = styleToTailwind(component.style)
  const classNameAttr = className ? ` className="${className}"` : ""

  switch (component.type) {
    case "button":
      const onClick = component.props.onClick
        ? ` onClick={${component.props.onClick}}`
        : ""
      return `${indentStr}<button${classNameAttr}${onClick}>\n${indentStr}  ${
        component.props.text || "Button"
      }\n${indentStr}</button>`

    case "input":
      const placeholder = component.props.placeholder
        ? ` placeholder="${component.props.placeholder}"`
        : ""
      const type = component.props.type
        ? ` type="${component.props.type}"`
        : ' type="text"'
      return `${indentStr}<input${classNameAttr}${type}${placeholder} />`

    case "text":
      return `${indentStr}<span${classNameAttr}>\n${indentStr}  ${
        component.props.text || "Text"
      }\n${indentStr}</span>`

    case "image":
      const src = component.props.src || "/placeholder.svg"
      const alt = component.props.alt || "Image"
      return `${indentStr}<img${classNameAttr} src="${src}" alt="${alt}" />`

    case "div":
    case "card":
    case "grid":
      const children = component.children
        .map((child) => generateComponentCode(child, indent + 1))
        .join("\n")

      if (children) {
        return `${indentStr}<div${classNameAttr}>\n${children}\n${indentStr}</div>`
      } else {
        return `${indentStr}<div${classNameAttr}></div>`
      }

    default:
      return `${indentStr}<div${classNameAttr}></div>`
  }
}

export const generateTSXCode = (components: EditorComponent[]): string => {
  const componentCode = components
    .map((component) => generateComponentCode(component, 1))
    .join("\n")

  return `export default function GeneratedComponent() {
  return (
    <div className="p-4">
${componentCode}
    </div>
  );
}`
}
