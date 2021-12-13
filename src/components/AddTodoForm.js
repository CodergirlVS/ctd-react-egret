import React from "react";
import { PropTypes } from "prop-types";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";
import { ReactComponent as Star } from "../Images/StarButton.svg";

function AddTodoForm({ onAddTodo, sortByTitle, sortByPriority }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const updatedTodoTitle = todoTitle.trim();
    onAddTodo(updatedTodoTitle);
    setTodoTitle("");
  };

  const handleSort = (e) => {
    if (e.target.value === "Title") {
      sortByTitle();
    } else if (e.target.value === "Priority") {
      sortByPriority();
    }
  };

  return (
    <form onSubmit={handleAddTodo} className={styles.Form}>
      <InputWithLabel
        value={todoTitle}
        onChange={handleTitleChange}
      ></InputWithLabel>
      <button type="submit" disabled={!todoTitle} className={styles.ButtonAdd}>
        Add
      </button>
      <span className={styles.StarButton}>
        <strong> Priority : </strong>
        <Star />
      </span>
      <div style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "5px" }}>
        Sort By:
        <select className={styles.SortSelect} onChange={handleSort}>
          <option>----</option>
          <option value="Title">Title</option>
          <option value="Priority">Priority</option>
        </select>
      </div>
    </form>
  );
}
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  sortByTitle: PropTypes.func,
  sortByPriority: PropTypes.func,
};

export default AddTodoForm;
