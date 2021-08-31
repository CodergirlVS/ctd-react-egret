import React from "react";
//import AddTodoForm from "./AddTodoForm";

function TodoListItem(props) {
  return <li>{props.todo.title}</li>;
}

export default TodoListItem;
