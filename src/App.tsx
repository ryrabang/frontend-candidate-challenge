import React, { useState } from "react"

import { TodoList } from "./components/TodoList"

import "./styles.scss"
import { INITIAL_TODOS } from "./constants"
import { AddTodo } from "./components/AddTodo"

export default function App() {

  // Get initial todo from cache?
  const [todos, setTodos] = useState(INITIAL_TODOS)

  // Ideally we would get the next unique id from the inital todo list
  const [newTodoId, setNewTodoId] = useState(2)

  const handleAddTodo = (newTodoText: string) => {
    setTodos((prev) => [
      { id: newTodoId, text: newTodoText, done: false },
      ...prev,
    ])
    setNewTodoId((prev) => prev + 1)
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

  const onDelete = (id: number) => {
    setTodos((prev) => prev.filter(item => item.id !== id))
  }

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} onChecked={onChecked} onDelete={onDelete}/>
    </div>
  )
}
