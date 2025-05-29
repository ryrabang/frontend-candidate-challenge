import { useState } from "react";

type AddTodoProps = {
    handleAddTodo: (todo: string) => void;
};

export function AddTodo({ handleAddTodo }: AddTodoProps) {
    const [newTodo, setNewTodo] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (newTodo) {
                    handleAddTodo(newTodo);
                    setNewTodo("");
                }
            }}
        >
            <input
                aria-label="todo-textbox"
                data-testid="todo-textbox"
                placeholder="Add new todo"
                type="text"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
            />
            <button type="submit" data-testid="add">Add</button>
        </form>
    );
}
