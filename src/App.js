import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?sort%5B0%5D%5Bfield%5D=Title&sort%5B0%5D%5Bdirection%5D=asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setTodoList(result.records), setIsLoading(false))
      .catch(() => setIsError(true));
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
        setTodoList([...todoList, ...data.records]);
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
        setTodoList(todoList.filter((item) => item.id !== data.records[0].id))
      );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <>
            <h1>Todo List</h1>
            {isError && <p>Something went wrong ...</p>}
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
              <p>
                <strong>Loading.....</strong>
              </p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
          </>
        </Route>
        <Route path="/new">
          <h1>New Todo List</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
