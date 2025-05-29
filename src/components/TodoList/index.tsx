import React from "react"
import { TodoType } from "../../types"
import { Todo } from "./Todo"

type TodoListProps = {
  todos: TodoType[]
  onChecked: (id: number) => void
}
export const TodoList = ({ todos, onChecked }: TodoListProps) => {
  return (
    <ul className="todoList">
      {todos.map((item, i) => (
        <Todo index={i} item={item} key={`todo-${i}`} onChecked={onChecked} />
      ))}
    </ul>
  )
}
