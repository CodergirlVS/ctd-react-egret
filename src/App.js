import React from "react";
import TodoContainer from "./components/TodoContainer";
import NavBar from "./components/NavBar.js";
import styles from "./App.module.css";
import Image from "./Images/Header.svg";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [todoCount, setTodoCount] = React.useState(0);

  function handleTodoCount(newTodoCount) {
    setTodoCount(newTodoCount);
  }
  return (
    <main className={styles.Main}>
      <BrowserRouter>
        <NavBar todoCount={todoCount} />
        <div className={styles.Body}>
          <div className={styles.Header}>
            <img src={Image} alt="headerImage" height="280px" width="100%" />
          </div>
          <div className={styles.Canvas}>
            <Switch>
              <Route exact path="/" />
              <Route path="/List1">
                <TodoContainer
                  tableName={"Work"}
                  handleTodoCount={handleTodoCount}
                />
              </Route>
              <Route path="/List2">
                <TodoContainer
                  tableName={"Personal"}
                  handleTodoCount={handleTodoCount}
                />
              </Route>
              <Route path="/List3">
                <TodoContainer
                  tableName={"Volunteer"}
                  handleTodoCount={handleTodoCount}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </main>
  );
}
export default App;
