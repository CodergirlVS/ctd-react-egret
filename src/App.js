import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function useSemiPersistentState() {
  const [todoList, dispatchTodoList] = React.useReducer(todoListReducer, {
    title: [],
    isLoading: true,
    isError: false,
  });
  React.useEffect(() => {
    if (!todoList.isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList.title));
    }
  }, [todoList]);

  return [todoList, dispatchTodoList];
}

const todoListReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TODO_LIST":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_TODO_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        title: action.payload,
      };
    case "FETCH_TODO_LIST_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "ADD_TODO":
      return {
        ...state,
        isLoading: false,
        isError: false,
        title: [...state.title, action.payload],
      };
    case "REMOVE_TODO_LIST":
      return {
        ...state,
        title: state.title.filter((item) => item.id !== action.payload),
      };
    default:
      throw new Error();
  }
};

const getAsyncList = () =>
  new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          data: { todoList: JSON.parse(localStorage.getItem("savedTodoList")) },
        }),
      2000
    );
  });

function App() {
  const [todoList, dispatchTodoList] = useSemiPersistentState();

  React.useEffect(() => {
    dispatchTodoList({ type: "FETCH_TODO_LIST" });

    getAsyncList()
      .then((result) => {
        dispatchTodoList({
          type: "FETCH_TODO_LIST_SUCCESS",
          payload: result.data.todoList,
        });
      })
      .catch(() => dispatchTodoList({ type: "FETCH_TODO_LIST_ERROR" }));
  }, [dispatchTodoList]);

  const addTodo = (newTodo) => {
    dispatchTodoList({
      type: "ADD_TODO",
      payload: newTodo,
    });
  };

  const removeTodo = (id) => {
    dispatchTodoList({
      type: "REMOVE_TODO_LIST",
      payload: id,
    });
  };

  return (
    <>
      <h1>Todo List</h1>
      {todoList.isError && <p>Something went wrong ...</p>}
      <AddTodoForm onAddTodo={addTodo} />
      {todoList.isLoading ? (
        <p>Loading....</p>
      ) : (
        <TodoList todoList={todoList.title} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
