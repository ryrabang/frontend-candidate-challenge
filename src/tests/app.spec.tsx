import { act,  render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"

import App from "../App"

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(<App />)
    expect(app).not.toBeUndefined()
  })

  it("renders initial items", () => {
    render(<App />)

    expect(screen.getByText("Buy milk")).toBeDefined()
    screen.getByTestId("todo-0")

    // TODO: Verify second todo
    expect(screen.getByText("Buy bread")).toBeDefined()
    screen.getByTestId("todo-1")
  })

  // TODO: Test app functionality: Create, edit, delete, mark as done.

  it("creates item", async () => {
    render(<App />)

    const input = screen.getByTestId("todo-add-textbox")

    // Test adding using enter
    act(() => {
      userEvent.type(input, "New todo{enter}")
    })

    await waitFor(() => {
      expect(screen.getByText("New todo")).toBeDefined()
      screen.getByTestId("todo-2")
    })

    // Test adding using the add button
    const addButton = screen.getByText("Add")

    act(() => {
      userEvent.type(input, "New todo 2")
      userEvent.click(addButton)
    })
    await waitFor(() => {
      expect(screen.getByText("New todo 2")).toBeDefined()
      screen.getByTestId("todo-3")
    })
  })

  it("delete item", async () => {
    render(<App />)

    const item = screen.getByTestId("todo-0")

    act(() => {
      userEvent.hover(item)
    })

    const deleteButton = screen.getByTestId("todo-0-delete")

    act(() => {
      userEvent.click(deleteButton)
    })

    await waitFor(() => {
      expect(screen.queryByText("Buy milk")).toBeNull()
    })
  })

  it("edit item", async () => {
    render(<App />)

    act(() => {
      userEvent.click(screen.getByTestId("todo-0-text"))
    })

    // Test saving using enter
    const editBox1 = screen.getByTestId("todo-0-edit")
    act(() => {
      userEvent.clear(editBox1)
      userEvent.type(editBox1, "Buy Chocolate{enter}")
    })

    await waitFor(() => {
      expect(screen.getByTestId("todo-0")).toHaveTextContent("Buy Chocolate")
      expect(screen.queryByTestId("todo-0-edit")).toBeNull()
    })

    // Test saving using save button
    act(() => {
      userEvent.click(screen.getByTestId("todo-0-text"))
    })

    const editBox2 = screen.getByTestId("todo-0-edit")
    act(() => {
      userEvent.clear(editBox2)
      userEvent.type(editBox1, "Buy Potato")
      userEvent.click(screen.getByTestId("todo-0-save"))
    })

    await waitFor(() => {
      expect(screen.getByTestId("todo-0")).toHaveTextContent("Buy Potato")
      expect(screen.queryByTestId("todo-0-edit")).toBeNull()
    })
  })

  it("mark item as done", async () => {
    render(<App />)
    const checkbox = screen.getByTestId("todo-1-checkbox")
    act(() => {
      userEvent.click(checkbox)
    })

    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })

  it("mark item as not done", async () => {
    render(<App />)
    const checkbox = screen.getByTestId("todo-0-checkbox")
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
    expect(screen.queryByTestId("todo-0-save")).toBeNull()
    expect(screen.getByTestId("todo-0-buttons")).not.toBeVisible()
    expect(screen.getByTestId("todo-0-delete")).not.toBeVisible()

    const item = screen.getByTestId("todo-0")

    act(() => {
      userEvent.hover(item)
    })

    await waitFor(() => {
      expect(screen.queryByTestId("todo-0-save")).toBeNull()
      expect(screen.getByTestId("todo-0-buttons")).toBeVisible()
      expect(screen.getByTestId("todo-0-delete")).toBeVisible()
    })

    act(() => {
      userEvent.click(screen.getByTestId("todo-0-text"))
      userEvent.hover(item)
    })
    await waitFor(() => {
      expect(screen.getByTestId("todo-0-save")).toBeVisible()
      expect(screen.getByTestId("todo-0-buttons")).toBeVisible()
      expect(screen.getByTestId("todo-0-delete")).toBeVisible()
    })
  })

  it("Check if tab targeting works", async () => {
    render(<App />)

    act(() => {
      userEvent.tab()
    })
    
    expect(screen.getByTestId("todo-add-textbox")).toHaveFocus()
    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId("add-button")).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId("todo-0-checkbox")).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId("todo-0-text")).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId("todo-0-delete")).toHaveFocus()

    act(() => {
      userEvent.tab({ shift: true })
      userEvent.keyboard("[Enter]")
    })
    expect(screen.getByTestId("todo-0-edit")).toHaveFocus()

    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId("todo-0-save")).toHaveFocus()

    act(() => {
      userEvent.tab()
      userEvent.tab()
    })
    expect(screen.getByTestId("todo-1-checkbox")).toHaveFocus()
  })

  it("Check if edit mode turns off", async () => {
    render(<App />)
    
    act(() => {
      userEvent.click(screen.getByTestId("todo-0-text"))
    })
    expect(screen.getByTestId("todo-0-edit")).toBeVisible()

    // test tab focus off element
    act(() => {
      userEvent.tab()
    })
    expect(screen.getByTestId("todo-0-edit")).toBeVisible()

    act(() => {
      userEvent.tab()
      userEvent.tab()
    })
    expect(screen.queryByTestId("todo-0-edit")).toBeNull()

    act(() => {
      userEvent.click(screen.getByTestId("todo-0-text"))
    })
    expect(screen.getByTestId("todo-0-edit")).toBeVisible()

    // test reverse tab focusing
    act(() => {
      userEvent.tab({ shift: true })
      userEvent.tab({ shift: true })
    })
    expect(screen.queryByTestId("todo-0-edit")).toBeNull()
  })
})
