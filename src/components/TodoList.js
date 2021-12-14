import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo, updateTodo }) => (
  <ul>
    {todoList.map((item) => (
      <TodoListItem
        key={item.id}
        todo={item}
        onRemoveTodo={onRemoveTodo}
        updateTodo={updateTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  updateTodo: PropTypes.func,
};
export default TodoList;
