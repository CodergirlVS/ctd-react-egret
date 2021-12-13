import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";
import Image from "../Images/RmButton.svg";
import { ReactComponent as Star } from "../Images/StarButton.svg";
import className from "classnames";

function TodoListItem({ todo, onRemoveTodo, onChange }) {
  const [toggle, setToggle] = React.useState(true);
  const [name, setName] = React.useState(todo.fields.Title);

  const starBtnClass = className(styles.StarButton, {
    [styles.StarButtonActive]: todo.fields.Priority,
  });

  const Strikethrough = className(styles.Strikethrough, {
    [styles.StrikeDone]: todo.fields.Completed,
  });

  const editTodo = (event) => {
    setToggle(!toggle);
    event.preventDefault();
    event.stopPropagation();
  };

  let tags;
  if (toggle) {
    tags = (
      <span className={styles.Titles} onClick={editTodo}>
        {name}
      </span>
    );
  } else {
    tags = (
      <input
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Escape") {
            setToggle(!toggle);
            event.preventDefault();
            event.stopPropagation();
            onChange(
              todo.id,
              todo.fields.Priority,
              todo.fields.Completed,
              name
            );
          }
        }}
      />
    );
  }

  return (
    <li className={styles.ListItems}>
      <input
        type="checkbox"
        className={Strikethrough}
        onChange={() => {
          onChange(todo.id, todo.fields.Priority, !todo.fields.Completed);
        }}
      />
      {tags}
      <button
        type="button"
        className={starBtnClass}
        onClick={() => {
          onChange(todo.id, !todo.fields.Priority, todo.fields.Completed);
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
