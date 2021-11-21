import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./TodoContainer.module.css";
//import Counter from "./Counter.js";

function TodoContainer({ tableName, increment }) {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  //const { count,  } = useContext(Counter);
  //console.log("Volunteer:" + countContext.current.count.Work);

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURI(
        tableName
      )}?sort%5B0%5D%5Bfield%5D=Title&sort%5B0%5D%5Bdirection%5D=asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
        console.log("Its working");
        // setCount.tableName(todoList.length);
        increment([todoList.length]);
      })
      .catch(() => setIsError(true));
  }, [tableName]);

  const addTodo = (newTodo) => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURI(tableName)}`,
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
        //setCounter(todoList.length);
      })
      .catch((error) => console.warn("error creating node", error));
  };

  const removeTodo = (id) => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURI(tableName)}?records[]=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTodoList(todoList.filter((item) => item.id !== data.records[0].id));
        //setCounter(todoList.length);
      });
  };

  const [priority, setPriority] = React.useState(0);

  const handlePriorityCount = (event) => {
    setPriority(priority + 1);
  };

  console.log(priority);

  return (
    <>
      <h1 className={styles.H1}>{tableName}</h1>
      {isError && <p>Something went wrong ...</p>}
      <p>Priority count is {priority}</p>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>
          <strong>Loading.....</strong>
        </p>
      ) : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onchange={handlePriorityCount}
        />
      )}
      {/* <span>{count.Work}</span> */}
    </>
  );
}

export default TodoContainer;
