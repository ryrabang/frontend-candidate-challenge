import { useState } from "react"

type AddTodoProps = {
  handleAddTodo: (todo: string) => void
}

export function AddTodo({ handleAddTodo }: AddTodoProps) {
  const [newTodo, setNewTodo] = useState("")

  return (
    <form
      className="addTodo"
      onSubmit={(e) => {
        e.preventDefault()
        if (newTodo) {
          handleAddTodo(newTodo)
          setNewTodo("")
        }
      }}
    >
      <input
        aria-label="Add new todo text box"
        data-testid="todo-add-textbox"
        placeholder="Add new todo"
        type="text"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <button type="submit" data-testid="add-button">
        Add
      </button>
    </form>
  )
}
