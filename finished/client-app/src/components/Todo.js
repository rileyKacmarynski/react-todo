import React, { useState } from 'react';

const Todo = ({ todo, deleteTodo }) => {
  const [complete, setComplete] = useState(false);

  console.log('Rendering <Todo /> component', todo)

  return (
    <li className="todo">
      <span
        className={complete ? 'strikethrough pointer' : 'strike pointer'}
        onClick={() => setComplete(!complete)}
      >
        {todo.description}
      </span>
      <i
        className="material-icons red pointer"
        onClick={() => deleteTodo(todo)}
      >
        delete
      </i>
    </li>
  );
}

function compareTodos(prevTodo, nextTodo){  
  return prevTodo.description === nextTodo.description
    && prevTodo.id === nextTodo.id
}

export default React.memo(Todo, compareTodos);