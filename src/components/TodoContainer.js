import React from "react";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./TodoContainer.module.css";

function TodoContainer({ tableName, handleTodoCount }) {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const [priorityCount, setPriorityCount] = React.useState(0);

  const getTotalPriorityItems = (list) => {
    const priorityItems = list.filter((item) => item.fields.Priority === true);
    return priorityItems.length;
  };

  const handlePriorityCount = (updatedTodoList) => {
    setPriorityCount(getTotalPriorityItems(updatedTodoList));
  };

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
        handlePriorityCount(result.records);
        handleTodoCount(result.records.length);
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
      });
  };

  const updateTodo = (id, priority) => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURI(tableName)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id: id,
              fields: {
                Priority: priority,
              },
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        const updatedTodoList = JSON.parse(JSON.stringify(todoList));
        const updatedItem = updatedTodoList.find((item) => item.id === id);
        updatedItem.fields.Priority = priority;
        setTodoList(updatedTodoList);
        handlePriorityCount(updatedTodoList);
      });
  };

  return (
    <>
      <h1 className={styles.H1}>{tableName}</h1>
      <h3>What's your plan for the day?</h3>
      {isError && <p>Something went wrong ...</p>}
      <p>
        <strong>Priority count is {priorityCount}</strong>
      </p>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>
          <strong>Loading.....</strong>
        </p>
      ) : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onChange={updateTodo}
        />
      )}
    </>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
  handleTodoCount: PropTypes.func,
};
export default TodoContainer;
