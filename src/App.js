import React from "react";
<<<<<<< HEAD
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styles from "./App.modules.css";
=======
import TodoContainer from "./TodoContainer";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
>>>>>>> 8efb7184a46106c08ae4af1d6fe5710edae2226e

function App() {
  return (
    <BrowserRouter>
      {/* //<Route exact path="/"> */}
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
      {/* //</Route> */}
      <Switch>
<<<<<<< HEAD
        <Route exact path="/">
          <div className={styles.container}>
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
          </div>
=======
        <Route path="/List1">
          <TodoContainer tableName={"List 1"} />
>>>>>>> 8efb7184a46106c08ae4af1d6fe5710edae2226e
        </Route>
        <Route path="/List2">
          <TodoContainer tableName={"List 2"} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
