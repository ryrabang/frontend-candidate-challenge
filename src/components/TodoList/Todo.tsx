import { TodoType } from "../../types"

export type TodoProps = {
  index: number
  item: TodoType
  onChecked: (id: number) => void
}

export function Todo({ index, item, onChecked }: TodoProps) {
  return (
    <li>
      <input
        type="checkbox"
        data-testid={`todo-checkbox-${index}`}
        checked={item.done}
        onClick={() => onChecked(item.id)}
      />
      <span
        data-testid={`todo-${index}`}
        style={{
          textDecoration: item.done ? "line-through" : "none",
        }}
      >
        {item.text}
      </span>
    </li>
  )
}
