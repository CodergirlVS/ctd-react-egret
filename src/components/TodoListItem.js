import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";
import Image from "../Images/RmButton.svg";
import { ReactComponent as Star } from "../Images/StarButton.svg";
import className from "classnames";

function TodoListItem({ todo, onRemoveTodo, onChange }) {
  const starBtnClass = className(styles.StarButton, {
    [styles.StarButtonActive]: todo.fields.Priority,
  });

  return (
    <li className={styles.ListItems}>
      <input
        type="checkbox"
        className={styles.strikethrough}
        onChange={() => {
          onChange(todo.id, !todo.fields.Completed);
        }}
      />
      <span>{todo.fields.Title}</span>
      <button
        type="button"
        className={starBtnClass}
        onClick={() => {
          onChange(todo.id, !todo.fields.Priority);
        }}
      >
        <Star />
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

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
  onChange: PropTypes.func,
};
export default TodoListItem;
