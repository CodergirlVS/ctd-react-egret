import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [newTodo, setNewTodo] = React.useState("");

  // const handleSearch = (str) => {
  //   console.log(str);
  // };

  return (
    <div>
      <h1>Todo List</h1>
      {/* <AddTodoForm onAddTodo={handleSearch} /> */}
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>Successfully added: {newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
