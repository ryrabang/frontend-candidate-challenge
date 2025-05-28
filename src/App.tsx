import React, { useState } from "react";

import { TodoList } from "./components/TodoList";

import "./styles.scss";
import { INITIAL_TODOS } from "./constants";

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <TodoList todos={todos} />
    </div>
  );
}
