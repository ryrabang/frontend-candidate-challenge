import React from "react"

import App from "../App"
import { act, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"

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

    const input = screen.getByTestId("todo-textbox")

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

  it("mark item as done", async () => {
    render(<App />)
    const checkbox = screen.getByTestId("todo-checkbox-1")
    act(() => {
      userEvent.click(checkbox)
    })

    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })
  })

  it("mark item as not done", async () => {
    render(<App />)
    const checkbox = screen.getByTestId("todo-checkbox-0")
    expect(checkbox).toBeChecked()
    act(() => {
      userEvent.click(checkbox)
    })

    await waitFor(() => {
      expect(checkbox).not.toBeChecked()
    })
  })
})
