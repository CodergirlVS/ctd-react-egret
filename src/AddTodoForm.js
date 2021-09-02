import React from "react";

function AddTodoForm(props) {
  //const [newTodo, setNewTodo] = React.useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    //console.log(newTodo);
    const todoTitle = event.target.title.value;
    //setNewTodo(todoTitle);
    console.log(todoTitle);
    //console.log(newTodo);
    props.onAddTodo(todoTitle);
    event.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input type="text" id="todoTitle" name="title"></input>
      <button type="submit">Add</button>
      {/* <p>Successfully added: {newTodo}</p> */}
    </form>
  );
}

export default AddTodoForm;
