import React, { useState } from 'react';

import TodoForm from './TodoForm';
import Todo from './Todo';

export default function Notebook() {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos(todos => [...todos, todo]);
  }

  function deleteTodo(todo) {
    setTodos(todos => {
      const newTodos = [...todos];
      const index = newTodos.indexOf(todo);
      newTodos.splice(index, 1);
      return newTodos;
    });
  }

  return (
    <div className="todos">
      <TodoForm addTodo={addTodo} />
      <div>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} deleteTodo={deleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
