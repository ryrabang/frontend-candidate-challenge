import React from "react";
import { TodoType } from "../../types";

type TodoListProps = {
  todos: TodoType[];
};
export const TodoList = ({ todos }: TodoListProps) => {

  return (
    <ul className="todoList">
      {todos.map((item, i) => (
        <li key={`todo-${i}`}>
          <span data-testid={`todo-${i}`}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};
