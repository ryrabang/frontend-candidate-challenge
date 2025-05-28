export type TodoProps = {
    index: number
    item: {
        text: string
        done: boolean
    }
}

export function Todo({
    index,
    item
}: TodoProps) {
    return (
        <li key={`todo-${index}`}>
          <span data-testid={`todo-${index}`}>{item.text}</span>
        </li>
    )
}