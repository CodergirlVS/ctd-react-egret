import React from "react";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  console.log(style);
  return (
    <li className={style.ListItems}>
      <div>{todo.fields.Title}</div>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
