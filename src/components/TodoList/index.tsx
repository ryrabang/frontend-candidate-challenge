import { TodoType } from "../../types"

import { Todo } from "./Todo"

type TodoListProps = {
  todos: TodoType[]
  onChecked: (id: number, value: string, isDone: boolean) => void
  onDelete: (id: number, value: string) => void
  onEdit: (id: number, value: string) => void
}
export const TodoList = ({
  todos,
  onChecked,
  onDelete,
  onEdit,
}: TodoListProps) => {
  return (
    <ul className="todoList">
      {todos.map((item) => (
        <Todo
          item={item}
          key={`todo-${item.id}`}
          onChecked={onChecked}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
