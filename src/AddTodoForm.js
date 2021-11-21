import React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(todoTitle);
    setTodoTitle("");
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
    </form>
  );
}

export default AddTodoForm;
