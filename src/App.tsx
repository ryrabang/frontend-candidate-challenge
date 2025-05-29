import React, { useState } from "react"

import { TodoList } from "./components/TodoList"

import "./styles.scss"
import { INITIAL_TODOS } from "./constants"
import { AddTodo } from "./components/AddTodo"

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [newTodoId, setNewTodoId] = useState(2)

  const handleAddTodo = (newTodoText: string) => {
    setTodos((prev) => [
      { id: newTodoId, text: newTodoText, done: false },
      ...prev,
    ])
    setNewTodoId((prev) => prev++)
  }

  const onChecked = (id: number) => {
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
  }

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} onChecked={onChecked} />
    </div>
  )
}
