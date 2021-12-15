import React from "react";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import Pagination from "./Pagination";
import styles from "./TodoContainer.module.css";

function TodoContainer({ tableName, changeCount, handlePriorityCount }) {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const titlesPerPage = 5;

  const getTotalPriorityItems = (list) => {
    const priorityItems = list.filter((item) => item.fields.Priority === true);
    return priorityItems.length;
  };

  const sortedTitleList = (a, b) => {
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

  const sortedPriorityList = (a, b) => {
    if (a.fields.Priority) {
      return -1;
    } else if (b.fields.Priority) {
      return 1;
    }
  };

  const sortByTitle = () => {
    setTodoList([...todoList.sort(sortedTitleList)]);
  };

  const sortByPriority = () => {
    setTodoList([...todoList.sort(sortedPriorityList)]);
  };

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURI(tableName)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        result.records.sort(sortedTitleList);
        setTodoList(result.records);
        setIsLoading(false);
        handlePriorityCount(getTotalPriorityItems(result.records), tableName);
        changeCount(result.records.length);
      })
      .catch(() => setIsError(true));
  }, [tableName, changeCount, handlePriorityCount]);

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
          newTodoArray.sort(sortedTitleList);
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

  const updateTodo = (id, priority, completed, newTitle) => {
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
                Title: newTitle,
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
        updatedItem.fields.Title = newTitle;

        setTodoList(updatedTodoList);
        handlePriorityCount(getTotalPriorityItems(updatedTodoList), tableName);
      });
  };

  const indexOfLastTitle = currentPage * titlesPerPage;
  const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;
  const currentTitles = todoList.slice(indexOfFirstTitle, indexOfLastTitle);

  return (
    <>
      <h1 className={styles.H1}>{tableName}</h1>
      <h3>What's your plan for the day?</h3>
      {isError && <p>Something went wrong ...</p>}

      <AddTodoForm
        onAddTodo={addTodo}
        sortByTitle={sortByTitle}
        sortByPriority={sortByPriority}
      />
      {isLoading ? (
        <p>
          <strong>Loading.....</strong>
        </p>
      ) : (
        <>
          <TodoList
            todoList={currentTitles}
            onRemoveTodo={removeTodo}
            updateTodo={updateTodo}
          />
          <Pagination
            titlesperPage={titlesPerPage}
            totalTitles={todoList.length}
            handlePageChange={setCurrentPage}
            activePg={currentPage}
          />
        </>
      )}
    </>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
  changeCount: PropTypes.func,
  handlePriorityCount: PropTypes.func,
};
export default TodoContainer;
