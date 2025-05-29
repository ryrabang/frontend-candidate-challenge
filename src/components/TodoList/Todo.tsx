import { TodoType } from "../../types"

export type TodoProps = {
  item: TodoType
  onChecked: (id: number) => void
  onDelete: (id: number) => void
}

export function Todo({ item, onChecked, onDelete }: TodoProps) {
  return (
    <li>
      <input
        type="checkbox"
        data-testid={`todo-checkbox-${item.id}`}
        checked={item.done}
        onClick={() => onChecked(item.id)}
      />
      <label
        htmlFor={`todo-checkbox-${item.id}`}
        data-testid={`todo-${item.id}`}
        style={{
          textDecoration: item.done ? "line-through" : "none",
        }}
      >
        {item.text}
      </label>
      <button
        data-testid={`todo-delete-${item.id}`}
        onClick={() => onDelete(item.id)}
      >
        Delete
      </button>
    </li>
  )
}
