import React from "react";
import { TodoType } from "../../types";
import { Todo } from "./Todo";

type TodoListProps = {
  todos: TodoType[];
};
export const TodoList = ({ todos }: TodoListProps) => {

  return (
    <ul className="todoList">
      {todos.map((item, i) => (
        <Todo index={i} item={item} key={`todo-${i}`} />
      ))}
    </ul>
  );
};
