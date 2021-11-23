import React from "react";
import TodoContainer from "./TodoContainer";
import NavBar from "./NavBar.js";
import styles from "./App.module.css";
import Image from "./Images/Header.svg";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <main className={styles.Main}>
      <BrowserRouter>
        <NavBar />
        <div className={styles.Body}>
          <div className={styles.Header}>
            <img src={Image} alt="headerImage" height="280px" width="100%" />
          </div>
          <div className={styles.Canvas}>
            <Switch>
              <Route exact path="/" />
              <Route path="/List1">
                <TodoContainer tableName={"Work"} />
              </Route>
              <Route path="/List2">
                <TodoContainer tableName={"Personal"} />
              </Route>
              <Route path="/List3">
                <TodoContainer tableName={"Volunteer"} />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </main>
  );
}
export default App;
