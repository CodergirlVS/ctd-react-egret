import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function TodoContainer() {
  const [todoList, setTodoList] = React.useState({
    List1: [],
    List2: [],
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const getFetch = () => {
    const urlList1 = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/List%201?sort%5B0%5D%5Bfield%5D=Title&sort%5B0%5D%5Bdirection%5D=asc`;
    const urlList2 = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID_LIST2}/List%202?sort%5B0%5D%5Bfield%5D=Title&sort%5B0%5D%5Bdirection%5D=asc`;

    fetch(urlList1, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then(
        (result) => setTodoList({ List1: result.records }),
        setIsLoading(false)
      )
      .catch(() => setIsError(true));

    fetch(urlList2, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then(
        (result) => setTodoList({ List2: result.records }),
        setIsLoading(false)
      )
      .catch(() => setIsError(true));
  };

  React.useEffect(() => {
    getFetch();
  }, []);

  const addTodo = (newTodo) => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Title: newTodo,
              },
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTodoList([...todoList.List1, ...data.records]);
      })
      .catch((error) => console.warn("error creating node", error));
  };
  const removeTodo = (id) => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?records[]=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setTodoList(
          todoList.List1.filter((item) => item.id !== data.records[0].id)
        )
      );
  };

  return (
    <BrowserRouter>
      <Route path="/">
        <nav>
          <ul>
            <li>
              <Link to="/List1"> List1</Link>
            </li>
            <li>
              <Link to="/List2">List2 </Link>
            </li>
          </ul>
        </nav>
      </Route>
      <Switch>
        <Route path="/List1">
          <>
            <h1>Todo List</h1>
            {isError && <p>Something went wrong ...</p>}
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
              <p>
                <strong>Loading.....</strong>
              </p>
            ) : (
              <TodoList todoList={todoList.List1} onRemoveTodo={removeTodo} />
            )}
          </>
        </Route>
        <Route path="/List2">
          <h1>New Todo List</h1>
          {isError && <p>Something went wrong ...</p>}
          <AddTodoForm onAddTodo={addTodo} />
          {isLoading ? (
            <p>
              <strong>Loading.....</strong>
            </p>
          ) : (
            <TodoList todoList={todoList.List2} onRemoveTodo={removeTodo} />
          )}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default TodoContainer;
