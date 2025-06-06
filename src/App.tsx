import { useState } from "react"

import { TodoList } from "./components/TodoList"
import "./styles.scss"
import { INITIAL_TODOS } from "./constants"
import { AddTodo } from "./components/AddTodo"
import { useAriaLiveAnnouncements } from "./hooks/useAriaLiveAnnouncements"

export default function App() {
  // Get initial todo from cache?
  const [todos, setTodos] = useState(INITIAL_TODOS)

  // Ideally we would get the next unique id from the inital todo list
  const [newTodoId, setNewTodoId] = useState(INITIAL_TODOS.length)

  const { setMessage, LiveRegion } = useAriaLiveAnnouncements()

  const handleAddTodo = (newTodoText: string) => {
    setTodos((prev) => [
      { id: newTodoId, text: newTodoText, done: false },
      ...prev,
    ])
    setNewTodoId((prev) => prev + 1)
    setMessage(`Added new todo: ${newTodoText}`)
  }

  const onChecked = (id: number, value: string, isDone: boolean) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              done: !item.done,
            }
          : item
      )
    )
    setMessage(isDone ? `Unmarked ${value} as done` : `Marked ${value} as done`)
  }

  const onDelete = (id: number, value: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id))
    setMessage(`Deleted todo: ${value}`)
  }

  const onEdit = (id: number, value: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              text: value,
            }
          : item
      )
    )
    setMessage(`Edited todo to ${value}`)
  }

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onChecked={onChecked}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      {LiveRegion}
    </div>
  )
}
