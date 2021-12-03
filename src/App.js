import React from "react";
import TodoContainer from "./components/TodoContainer";
import NavBar from "./components/NavBar.js";
import styles from "./App.module.css";
import Image from "./Images/Header.svg";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [todoCount, setTodoCount] = React.useState(0);
  const [priorityCount, setPriorityCount] = React.useState(0);

  const tableName = {
    work: "Work",
    personal: "Personal",
    volunteer: "Volunteer",
  };

  function handleTodoCount(newTodoCount) {
    setTodoCount(newTodoCount);
  }

  function handlePriorityCount(newPriorityCount) {
    setPriorityCount(newPriorityCount);
  }

  return (
    <main className={styles.Main}>
      <BrowserRouter>
        <NavBar todoCount={todoCount} priorityCount={priorityCount} />
        <div className={styles.Body}>
          <div className={styles.Header}>
            <img src={Image} alt="headerImage" height="280px" width="100%" />
          </div>
          <div className={styles.Canvas}>
            <Switch>
              <Route exact path="/" />
              <Route path="/List1">
                <TodoContainer
                  tableName={tableName.work}
                  handleTodoCount={handleTodoCount}
                  handlePriorityCount={handlePriorityCount}
                />
              </Route>
              <Route path="/List2">
                <TodoContainer
                  tableName={tableName.personal}
                  handleTodoCount={handleTodoCount}
                  handlePriorityCount={handlePriorityCount}
                />
              </Route>
              <Route path="/List3">
                <TodoContainer
                  tableName={tableName.volunteer}
                  handleTodoCount={handleTodoCount}
                  handlePriorityCount={handlePriorityCount}
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
