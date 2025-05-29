import React from 'react';

import App from "../App";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(<App />);
    expect(app).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(<App />);

    expect(screen.getByText("Buy milk")).toBeDefined();
    screen.getByTestId("todo-0");

    // TODO: Verify second todo
    expect(screen.getByText("Buy bread")).toBeDefined();
    screen.getByTestId("todo-1");
  });
  
  // TODO: Test app functionality: Create, edit, delete, mark as done.

  it("creates item", async () => {
    render(<App />);

    const input = screen.getByTestId("todo-textbox");
    act(() => {
      userEvent.type(input, 'New todo{enter}');
    })


    // TODO: Verify second todo
    await waitFor(() => {
    expect(screen.getByText("New todo")).toBeDefined();
    screen.getByTestId("todo-2");
    })
  })
});
