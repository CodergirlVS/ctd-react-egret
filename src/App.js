import React from "react";
import TodoContainer from "./TodoContainer";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
function App() {
  return (
    <BrowserRouter>
      {/* //<Route exact path="/"> */}
      <nav className={styles.NavBar}>
        <ul>
          <li className={styles.List}>
            <Link to="/List1"> Work </Link>
          </li>
          <li className={styles.List}>
            <Link to="/List2"> Personal </Link>
          </li>
          <li className={styles.List}>
            <Link to="/List3"> Volunteer </Link>
          </li>
        </ul>
      </nav>
      {/* //</Route> */}
      <Switch>
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
    </BrowserRouter>
  );
}
export default App;
