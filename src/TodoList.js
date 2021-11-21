import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo, onChange }) => (
  <ul>
    {todoList.map((item) => (
      <TodoListItem
        key={item.id}
        todo={item}
        onRemoveTodo={onRemoveTodo}
        onChange={onChange}
      />
    ))}
  </ul>
);

export default TodoList;
