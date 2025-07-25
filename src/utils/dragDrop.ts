import type { EditorComponent } from "../types/editor"

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const createNewComponent = (type: string): EditorComponent => {
  const id = generateId()

  const baseComponent: EditorComponent = {
    id,
    type: type as
      | "button"
      | "input"
      | "text"
      | "image"
      | "div"
      | "card"
      | "grid",
    props: {},
    style: {
      padding: "8px",
      margin: "4px",
    },
    children: [],
  }

  switch (type) {
    case "button":
      return {
        ...baseComponent,
        props: { text: "Button" },
        style: {
          ...baseComponent.style,
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        },
      }
    case "input":
      return {
        ...baseComponent,
        props: { placeholder: "Enter text..." },
        style: {
          ...baseComponent.style,
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          padding: "8px 12px",
          width: "200px",
        },
      }
    case "text":
      return {
        ...baseComponent,
        props: { text: "Text Element" },
        style: {
          ...baseComponent.style,
          fontSize: "16px",
        },
      }
    case "image":
      return {
        ...baseComponent,
        props: {
          src: "/placeholder.svg?height=100&width=100&text=Image",
          alt: "Image",
        },
        style: {
          ...baseComponent.style,
          width: "100px",
          height: "100px",
        },
      }
    case "div":
      return {
        ...baseComponent,
        style: {
          ...baseComponent.style,
          border: "2px dashed #d1d5db",
          minHeight: "100px",
          width: "200px",
          display: "flex",
          flexDirection: "column",
        },
      }
    case "card":
      return {
        ...baseComponent,
        style: {
          ...baseComponent.style,
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "16px",
          minHeight: "120px",
          width: "250px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        },
      }
    case "grid":
      return {
        ...baseComponent,
        style: {
          ...baseComponent.style,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          border: "2px dashed #d1d5db",
          minHeight: "200px",
          width: "300px",
          padding: "16px",
        },
      }
    default:
      return baseComponent
  }
}

export const findComponentById = (
  components: EditorComponent[],
  id: string
): EditorComponent | null => {
  for (const component of components) {
    if (component.id === id) {
      return component
    }
    const found = findComponentById(component.children, id)
    if (found) {
      return found
    }
  }
  return null
}

export const removeComponentById = (
  components: EditorComponent[],
  id: string
): EditorComponent[] => {
  return components.filter((component) => {
    if (component.id === id) {
      return false
    }
    component.children = removeComponentById(component.children, id)
    return true
  })
}
