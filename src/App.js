import React from 'react';
const todoList = [
  {
    id: 1,
    title: 'Write Lesson 1.1 instructions',
  },
  {
    id: 2,
    title: 'Submit Pull Request',
  },
  {
    id: 3,
    title: 'Respond to introduction email',
  },
];

function App() {
  return (

    <div>
      <h1>Todo List</h1>
        <ul>
          {todoList.map(function(item){
            return <li key={item.id}>{item.title}</li>;
          })
          }
        </ul>

      
      
    </div>
  );
}

export default App;
