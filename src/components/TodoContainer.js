import React from "react";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./TodoContainer.module.css";

function TodoContainer({ tableName, changeCount, handlePriorityCount }) {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const getTotalPriorityItems = (list) => {
    const priorityItems = list.filter((item) => item.fields.Priority === true);
    return priorityItems.length;
  };

  const sortedList = (a, b) => {
    const aLowercase = a.fields.Title.toLowerCase();
    const bLowercase = b.fields.Title.toLowerCase();
    if (aLowercase < bLowercase) {
      return -1;
    } else if (aLowercase === bLowercase) {
      return 0;
    } else {
      return 1;
    }
  };

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURI(
        tableName
      )}?view=Grid%20view&sort%5B0%5D%5Bfield%5D=Title&sort%5B0%5D%5Bdirection%5D=asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        result.records.sort(sortedList);
        setTodoList(result.records);
        setIsLoading(false);
        handlePriorityCount(getTotalPriorityItems(result.records));
        changeCount(result.records.length);
      })
      .catch(() => setIsError(true));
  }, [tableName]);

  const addTodo = (newTodo) => {
    if (!newTodo) {
      return;
    } else {
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
          const newTodoArray = [...todoList, ...data.records];
          newTodoArray.sort(sortedList);
          setTodoList(newTodoArray);
          changeCount(todoList.length + 1);
        })
        .catch((error) => console.warn("error creating node", error));
    }
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
        changeCount(todoList.length - 1);
      });
  };

  const updateTodo = (id, priority, completed) => {
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
                Completed: completed,
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
        updatedItem.fields.Completed = completed;
        setTodoList(updatedTodoList);
        handlePriorityCount(getTotalPriorityItems(updatedTodoList));
      });
  };

  return (
    <>
      <h1 className={styles.H1}>{tableName}</h1>
      <h3>What's your plan for the day?</h3>
      {isError && <p>Something went wrong ...</p>}

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
  handlePriorityCount: PropTypes.func,
};
export default TodoContainer;
