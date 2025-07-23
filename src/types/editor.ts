export interface ComponentStyle {
  width?: string
  height?: string
  backgroundColor?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  padding?: string
  margin?: string
  borderRadius?: string
  border?: string
  textAlign?: "left" | "center" | "right"
  display?: string
  flexDirection?: "row" | "column"
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch"
  gap?: string
  position?: "relative" | "absolute"
  top?: string
  left?: string
  right?: string
  bottom?: string
}

export interface ComponentProps {
  text?: string
  placeholder?: string
  src?: string
  alt?: string
  href?: string
  type?: string
  onClick?: string
}

export interface EditorComponent {
  id: string
  type: "button" | "input" | "text" | "image" | "div" | "card" | "grid"
  props: ComponentProps
  style: ComponentStyle
  children: EditorComponent[]
  parentId?: string
}

export interface DragItem {
  type: string
  component?: EditorComponent
  isNew?: boolean
}
