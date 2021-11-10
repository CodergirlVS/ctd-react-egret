import React from "react";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItems}>
      <input type="checkbox" />
      <span>{todo.fields.Title}</span>
      <button
        className={styles.RmvButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
