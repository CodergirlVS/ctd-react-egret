import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodoForm from "./AddTodoForm";

describe("AddTodoForm", () => {
  const addTodoFormProps = {
    onAddTodo: jest.fn(),
    sortByTitle: jest.fn(),
    sortByPriority: jest.fn(),
  };

  test("Should add todo when clicked on the Add button", () => {
    //onAddTodo

    render(<AddTodoForm {...addTodoFormProps} />);
    expect(screen.getByText("Add")).toBeInTheDocument();

    screen.debug();
  });

  test("should have a disabled add button to start", () => {
    render(<AddTodoForm {...addTodoFormProps} />);

    expect(screen.getByText("Add")).toBeDisabled();

    //const input = screen.getByTestId('my-input');
  });

  test("should call onAddTodo when clicking the add button", () => {
    // onAddTodo, sortByTitle, sortByPriority

    const mockOnAddTodo = jest.fn();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("Enter a new list item...");
    fireEvent.change(input, { target: { value: "23" } });
    const button = screen.getByText("Add");
    fireEvent.click(button);

    expect(mockOnAddTodo).toHaveBeenCalled();

    screen.debug();
  });
});
