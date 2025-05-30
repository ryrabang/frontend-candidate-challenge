import { useState } from "react"
import { FaRegTrashAlt, FaCheck } from "react-icons/fa"

import { TodoType } from "../../types"

export type TodoProps = {
  item: TodoType
  onChecked: (id: number, value: string, isDone: boolean) => void
  onDelete: (id: number, value: string) => void
  onEdit: (id: number, value: string) => void
}

export function Todo({ item, onChecked, onDelete, onEdit }: TodoProps) {
  // --- These states can be replaced with pure CSS tricks
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  // ---
  const [isEditMode, setIsEditMode] = useState(false)
  const [value, setValue] = useState(item.text.trim())

  const { id } = item

  const text = item.text.trim()

  const onSave = () => {
    onEdit(id, value)
    setIsEditMode(false)
  }

  const onTabOut = () => {
    setValue(text)
    setIsEditMode(false)
  }

  // These functions can be replaced with pure CSS tricks
  const handleIsFocused = () => setIsFocused(true)
  const handleIsBlurred = () => setIsFocused(false)

  const showButtons = isHovering || isFocused

  return (
    <li
      className="todo"
      data-testid={`todo-${id}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="todo-text">
        <input
          title={`checkbox for ${text}`}
          aria-label={`checkbox for ${text}`}
          type="checkbox"
          data-testid={`todo-${id}-checkbox`}
          checked={item.done}
          onChange={() => {
            onChecked(id, text, item.done)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChecked(id, text, item.done)
              return
            }
            if (e.shiftKey && e.key === "Tab") {
              onTabOut()
            }
          }}
          onFocus={handleIsFocused}
          onBlur={handleIsBlurred}
        />
        {isEditMode ? (
          <input
            aria-label={`edit textbox for item ${text}`}
            className="edit-input"
            data-testid={`todo-${id}-edit`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onFocus={handleIsFocused}
            onBlur={handleIsBlurred}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave()
              }
              if (e.key === "Escape") {
                setIsEditMode(false)
                setValue(text)
              }
            }}
          />
        ) : (
          <span
            tabIndex={0}
            data-testid={`todo-${id}-text`}
            title={text}
            aria-label={`${text}. click to edit`}
            className={`text-value ${item.done ? "done" : ""} ${
              text.length ? "" : "empty"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditMode(true)
              }
            }}
            onClick={() => setIsEditMode(true)}
            onFocus={handleIsFocused}
            onBlur={handleIsBlurred}
          >
            {text.length ? text : "empty"}
          </span>
        )}
      </div>
      <div
        data-testid={`todo-${id}-buttons`}
        className="buttons"
        style={{
          opacity: showButtons ? 1 : 0,
          pointerEvents: showButtons ? "auto" : "none",
        }}
      >
        {isEditMode && (
          <button
            title="Save todo"
            aria-label={`save button for item ${text}`}
            data-testid={`todo-${id}-save`}
            className="save"
            onClick={() => onSave()}
            onFocus={handleIsFocused}
            onBlur={handleIsBlurred}
          >
            <FaCheck size={16} />
          </button>
        )}
        <button
          title="Delete todo"
          aria-label={`delete button for item ${text}`}
          className="delete"
          data-testid={`todo-${id}-delete`}
          onClick={() => onDelete(id, text)}
          onFocus={handleIsFocused}
          onBlur={handleIsBlurred}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              onTabOut()
            }
          }}
        >
          <FaRegTrashAlt size={16} />
        </button>
      </div>
    </li>
  )
}
