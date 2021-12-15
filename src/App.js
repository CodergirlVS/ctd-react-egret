import React from "react";
import TodoContainer from "./components/TodoContainer";
import NavBar from "./components/NavBar.js";
import "./App.scss";
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
  const [colorTheme, setColorTheme] = React.useState("ThemeDefault");

  const handlePriorityCount = (count, currentTableName) => {
    if (currentTableName === tableName.work) {
      setWorkPriorityCount(count);
    }

    if (currentTableName === tableName.personal) {
      setPersonalPriorityCount(count);
    }

    if (currentTableName === tableName.volunteer) {
      setVolunteerPriorityCount(count);
    }
  };
  const tableName = React.useMemo(() => {
    return {
      work: "Work",
      personal: "Personal",
      volunteer: "Volunteer",
    };
  }, []);

  React.useEffect(() => {
    // check for selected theme localstorage value.
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
    }
  }, []);

  //set color theme.
  const handleClick = (theme) => {
    setColorTheme(theme);
    localStorage.setItem("theme-color", theme);
  };

  // To fetch all the tables at load and get the todoCounts and Priority status to be displayed in the navbar.
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
  }, [tableName]);

  return (
    <main className={`Main ${colorTheme}`}>
      <BrowserRouter>
        <div className="ThemeOptions">
          <div
            id="ThemeGreen"
            onClick={() => handleClick("ThemeGreen")}
            className={`${colorTheme === "ThemeGreen" ? "active" : ""}`}
          />
          <div
            id="ThemeBlue"
            onClick={() => handleClick("ThemeBlue")}
            className={`${colorTheme === "ThemeBlue" ? "active" : ""}`}
          />
          <div
            id="ThemePink"
            onClick={() => handleClick("ThemePink")}
            className={`${colorTheme === "ThemePink" ? "active" : ""}`}
          />
          <div
            id="ThemeDefault"
            onClick={() => handleClick("ThemeDefault")}
            className={`${colorTheme === "ThemeDefault" ? "active" : ""}`}
          />
          <div
            id="ThemeBlack"
            onClick={() => handleClick("ThemeBlack")}
            className={`${colorTheme === "ThemeBlack" ? "active" : ""}`}
          />
        </div>
        <NavBar
          workCount={workCount}
          personalCount={personalCount}
          volunteerCount={volunteerCount}
          workPriorityCount={workPriorityCount}
          personalPriorityCount={personalPriorityCount}
          volunteerPriorityCount={volunteerPriorityCount}
        />
        <div className="DataContainer">
          <div className="Header">
            <Image className="HeaderImg" />
          </div>

          <div className="Canvas">
            <Switch>
              <Route exact path="/">
                <h1>Organize it all with US</h1>
                <h2>Get started here!</h2>
              </Route>
              <Route path="/List1">
                <TodoContainer
                  tableName={tableName.work}
                  handlePriorityCount={handlePriorityCount}
                  changeCount={setWorkCount}
                />
              </Route>
              <Route path="/List2">
                <TodoContainer
                  tableName={tableName.personal}
                  handlePriorityCount={handlePriorityCount}
                  changeCount={setPersonalCount}
                />
              </Route>
              <Route path="/List3">
                <TodoContainer
                  tableName={tableName.volunteer}
                  handlePriorityCount={handlePriorityCount}
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
