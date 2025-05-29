import React, { useState } from "react";

import { TodoList } from "./components/TodoList";

import "./styles.scss";
import { INITIAL_TODOS } from "./constants";
import { AddTodo } from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);

  const handleAddTodo = (newTodoText: string) => {
    setTodos((prev) => [{text: newTodoText, done: false}, ...prev])
  }

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}
