import React from "react";
import TodoContainer from "./TodoContainer";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* //<Route exact path="/"> */}
      <nav>
        <ul>
          <li>
            <Link to="/List1"> Work </Link>
          </li>
          <li>
            <Link to="/List2"> Personal </Link>
          </li>
        </ul>
      </nav>
      {/* //</Route> */}
      <Switch>
        <Route path="/List1">
          <TodoContainer tableName={"List 1"} />
        </Route>
        <Route path="/List2">
          <TodoContainer tableName={"List 2"} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
