import React from "react";
import styles from "./TodoListItem.module.css";
import Image from "./Images/RmButton.svg";

function TodoListItem({ todo, onRemoveTodo, onChange }) {
  return (
    <li className={styles.ListItems}>
      <input type="checkbox" className={styles.strikethrough} />
      <span style={{ marginRight: "8px" }}>{todo.fields.Title}</span>
      <button
        type="button"
        className={styles.StarButton}
        onClick={() => onChange}
      >
        <i class="fa fa-star-o" aria-hidden="true"></i>
      </button>
      <button
        className={styles.RmvButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        <img src={Image} height="20px" width="auto" alt="Remove Button" />
      </button>
    </li>
  );
}

export default TodoListItem;
