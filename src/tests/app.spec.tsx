import { act,  render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"

import App from "../App"
import { addButton, addTextBox, defaultTodo1, defaultTodo2, newTodo1, newTodo2 } from "./testConstants"

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(<App />)
    expect(app).not.toBeUndefined()
  })

  it("renders initial items", () => {
    render(<App />)

    expect(screen.getByText(defaultTodo1.text)).toBeDefined()
    screen.getByTestId(defaultTodo1.id)

    // TODO: Verify second todo
    expect(screen.getByText(defaultTodo2.text)).toBeDefined()
    screen.getByTestId(defaultTodo2.id)
  })

  // TODO: Test app functionality: Create, edit, delete, mark as done.

  it("creates item", async () => {
    render(<App />)

    const input = screen.getByTestId(addTextBox)

    // Test adding using enter
    act(() => {
      userEvent.type(input, `${newTodo1.text}{enter}`)
    })

    await waitFor(() => {
      expect(screen.getByText(newTodo1.text)).toBeDefined()
      screen.getByTestId(newTodo1.id)
    })

    // Test adding using the add button
    const add = screen.getByText(addButton.text)

    act(() => {
      userEvent.type(input, newTodo2.text)
      userEvent.click(add)
    })
    await waitFor(() => {
      expect(screen.getByText(newTodo2.text)).toBeDefined()
      screen.getByTestId(newTodo2.id)
    })
  })

  it("delete item", async () => {
    render(<App />)

    const item = screen.getByTestId(defaultTodo1.id)

    act(() => {
      userEvent.hover(item)
    })

    const deleteButton = screen.getByTestId(defaultTodo1.delete)

    act(() => {
      userEvent.click(deleteButton)
    })

    await waitFor(() => {
      expect(screen.queryByText(defaultTodo1.text)).toBeNull()
    })
  })

  it("edit item", async () => {
    render(<App />)

    act(() => {
      userEvent.click(screen.getByTestId(defaultTodo1.textId))
    })

    // Test saving using enter
    const editBox1 = screen.getByTestId(defaultTodo1.edit)
    act(() => {
      userEvent.clear(editBox1)
      userEvent.type(editBox1, `${defaultTodo1.editedText}{enter}`)
    })

    await waitFor(() => {
      expect(screen.getByTestId(defaultTodo1.id)).toHaveTextContent(defaultTodo1.editedText)
      expect(screen.queryByTestId(defaultTodo1.edit)).toBeNull()
    })

    // Test saving using save button
    act(() => {
      userEvent.click(screen.getByTestId(defaultTodo2.textId))
    })

    const editBox2 = screen.getByTestId(defaultTodo2.edit)
    act(() => {
      userEvent.clear(editBox2)
      userEvent.type(editBox2, defaultTodo2.editedText)
      userEvent.click(screen.getByTestId(defaultTodo2.save))
    })

    await waitFor(() => {
      expect(screen.getByTestId(defaultTodo2.id)).toHaveTextContent(defaultTodo2.editedText)
      expect(screen.queryByTestId(defaultTodo2.edit)).toBeNull()
    })
  })

  it("mark item as done", async () => {
    render(<App />)
    const checkbox = screen.getByTestId(defaultTodo2.checkbox)
    act(() => {
      userEvent.click(checkbox)
    })

    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })

  it("mark item as not done", async () => {
    render(<App />)
    const checkbox = screen.getByTestId(defaultTodo1.checkbox)
    expect(checkbox).toBeChecked()
    act(() => {
      userEvent.click(checkbox)
    })

    await waitFor(() => {
      expect(checkbox).not.toBeChecked()
    })
  })

  it("Check if save and delete buttons are visible", async () => {
    render(<App />)
    expect(screen.queryByTestId(defaultTodo1.save)).toBeNull()
    expect(screen.getByTestId(defaultTodo1.buttons)).not.toBeVisible()
    expect(screen.getByTestId(defaultTodo1.delete)).not.toBeVisible()

    const item = screen.getByTestId(defaultTodo1.id)

    act(() => {
      userEvent.hover(item)
    })

    await waitFor(() => {
      expect(screen.queryByTestId(defaultTodo1.save)).toBeNull()
      expect(screen.getByTestId(defaultTodo1.buttons)).toBeVisible()
      expect(screen.getByTestId(defaultTodo1.delete)).toBeVisible()
    })

    act(() => {
      userEvent.click(screen.getByTestId(defaultTodo1.textId))
      userEvent.hover(item)
    })
    await waitFor(() => {
      expect(screen.getByTestId(defaultTodo1.save)).toBeVisible()
      expect(screen.getByTestId(defaultTodo1.buttons)).toBeVisible()
      expect(screen.getByTestId(defaultTodo1.delete)).toBeVisible()
    })
  })

  it("Check if tab targeting works", async () => {
    render(<App />)

    act(() => {
      userEvent.tab()
    })
    
    expect(screen.getByTestId(addTextBox)).toHaveFocus()
    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId(addButton.id)).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId(defaultTodo1.checkbox)).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId(defaultTodo1.textId)).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId(defaultTodo1.delete)).toHaveFocus()

    act(() => {
      userEvent.tab({ shift: true })
      userEvent.keyboard("[Enter]")
    })
    expect(screen.getByTestId(defaultTodo1.edit)).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId(defaultTodo1.save)).toHaveFocus()

    act(() => {
      userEvent.tab()
      userEvent.tab()
    })
    expect(screen.getByTestId(defaultTodo2.checkbox)).toHaveFocus()
  })

  it("Check if edit mode turns off", async () => {
    render(<App />)
    
    act(() => {
      userEvent.click(screen.getByTestId(defaultTodo1.textId))
    })
    expect(screen.getByTestId(defaultTodo1.edit)).toBeVisible()

    // test tab focus off element
    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId(defaultTodo1.edit)).toBeVisible()

    act(() => {
      userEvent.tab()
      userEvent.tab()
    })
    expect(screen.queryByTestId(defaultTodo1.edit)).toBeNull()

    act(() => {
      userEvent.click(screen.getByTestId(defaultTodo1.textId))
    })
    expect(screen.getByTestId(defaultTodo1.edit)).toBeVisible()

    // test reverse tab focusing
    act(() => {
      userEvent.tab({ shift: true })
      userEvent.tab({ shift: true })
    })
    expect(screen.queryByTestId(defaultTodo1.edit)).toBeNull()
  })
})
