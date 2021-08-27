import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    id: 1,
    title: "Write Lesson 1.1 instructions",
  },
  {
    id: 2,
    title: "Submit Pull Request",
  },
  {
    id: 3,
    title: "Respond to introduction email",
  },
];

function TodoList() {
  return (
    <ul>
      {todoList.map(function (item) {
        return <TodoListItem />;
      })}
    </ul>
  );
}
export default TodoList;
