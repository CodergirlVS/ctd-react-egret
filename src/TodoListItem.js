import React from "react";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItems}>
      <div>{todo.fields.Title}</div>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
