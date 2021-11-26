import React from "react";
import PropTypes from "prop-types";
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

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onChange: PropTypes.func,
};
export default TodoList;
