import React from "react";
import styles from "./TodoListItem.module.css";
import Image from "./Images/RmButton.svg";
import { ReactComponent as Star } from "./Images/StarButton.svg";
import className from "classnames";

function TodoListItem({ todo, onRemoveTodo, onChange }) {
  const starBtnClass = className(styles.StarButton, {
    [styles.StarButtonActive]: true,
  });

  return (
    <li className={styles.ListItems}>
      <input type="checkbox" className={styles.strikethrough} />
      <span>{todo.fields.Title}</span>
      <button
        type="button"
        className={starBtnClass}
        onClick={() => {
          onChange(todo.id);
        }}
      >
        <Star />

        {/* <i class="fa fa-star" aria-hidden="true"></i> */}
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
