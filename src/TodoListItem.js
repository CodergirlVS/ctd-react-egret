import React from "react";

function TodoListItem({ todo, onRemoveTodo }) {
  console.log(todo);
  return (
    <li>
      <div>{todo.fields.Title}</div>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
