import React from "react"
import { TodoType } from "../../types"
import { Todo } from "./Todo"

type TodoListProps = {
  todos: TodoType[]
  onChecked: (id: number) => void
  onDelete: (id: number) => void
}
export const TodoList = ({ todos, onChecked, onDelete }: TodoListProps) => {
  return (
    <ul className="todoList">
      {todos.map((item) => (
        <Todo item={item} key={`todo-${item.id}`} onChecked={onChecked} onDelete={onDelete} />
      ))}
    </ul>
  )
}
