import React, { useState } from 'react';

export default function Todo({ todo, deleteTodo }) {
  let [complete, setComplete] = useState(false);

  console.log(todo);

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
