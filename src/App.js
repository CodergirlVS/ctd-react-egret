import React from "react";
import TodoContainer from "./components/TodoContainer";
import NavBar from "./components/NavBar.js";
import styles from "./App.module.css";
import { ReactComponent as Image } from "./Images/Header.svg";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const getTotalPriorityItemsCount = (list) => {
  const priorityItems = list.filter((item) => item.fields.Priority === true);
  return priorityItems.length;
};

async function fetchTableCounts(tableName) {
  const resp = await fetch(
    `https://api.airtable.com/v0/${
      process.env.REACT_APP_AIRTABLE_BASE_ID
    }/${encodeURI(
      tableName
    )}?sort%5B0%5D%5Bfield%5D=Title&sort%5B0%5D%5Bdirection%5D=asc`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    }
  );
  const data = await resp.json();
  return {
    count: data.records.length,
    priorityCount: getTotalPriorityItemsCount(data.records),
  };
}

function App() {
  const [workCount, setWorkCount] = React.useState(0);
  const [personalCount, setPersonalCount] = React.useState(0);
  const [volunteerCount, setVolunteerCount] = React.useState(0);
  const [workPriorityCount, setWorkPriorityCount] = React.useState(0);
  const [personalPriorityCount, setPersonalPriorityCount] = React.useState(0);
  const [volunteerPriorityCount, setVolunteerPriorityCount] = React.useState(0);

  const tableName = {
    work: "Work",
    personal: "Personal",
    volunteer: "Volunteer",
  };

  React.useEffect(() => {
    async function fetchAll() {
      const workTable = await fetchTableCounts(tableName.work);
      setWorkCount(workTable.count);
      setWorkPriorityCount(workTable.priorityCount);

      const personalTable = await fetchTableCounts(tableName.personal);
      setPersonalCount(personalTable.count);
      setPersonalPriorityCount(personalTable.priorityCount);

      const volunteerTable = await fetchTableCounts(tableName.volunteer);
      setVolunteerCount(volunteerTable.count);
      setVolunteerPriorityCount(volunteerTable.priorityCount);
    }
    fetchAll();
  }, []);

  return (
    <main className={styles.Main}>
      <BrowserRouter>
        <NavBar
          workCount={workCount}
          personalCount={personalCount}
          volunteerCount={volunteerCount}
          workPriorityCount={workPriorityCount}
          personalPriorityCount={personalPriorityCount}
          volunteerPriorityCount={volunteerPriorityCount}
        />
        <div className={styles.Body}>
          <div className={styles.Header}>
            <Image className={styles.Img} />
          </div>
          <div className={styles.Canvas}>
            <Switch>
              <Route exact path="/">
                <h1>Organize it all with Todoist</h1>
                <h2>Get started here!</h2>
              </Route>
              <Route path="/List1">
                <TodoContainer
                  tableName={tableName.work}
                  //handleTodoCount={handleTodoCount}
                  handlePriorityCount={setWorkPriorityCount}
                  changeCount={setWorkCount}
                />
              </Route>
              <Route path="/List2">
                <TodoContainer
                  tableName={tableName.personal}
                  // handleTodoCount={handleTodoCount}
                  handlePriorityCount={setPersonalPriorityCount}
                  changeCount={setPersonalCount}
                />
              </Route>
              <Route path="/List3">
                <TodoContainer
                  tableName={tableName.volunteer}
                  // handleTodoCount={handleTodoCount}
                  handlePriorityCount={setVolunteerPriorityCount}
                  changeCount={setVolunteerCount}
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
