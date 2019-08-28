import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';

import TodoForm from './TodoForm';
import Todo from './Todo';

export default function Todos() {
  const [todos, setTodos] = useState([]);

  function addTodo(description) {
    const todo = { id: uuidv1(), description };
    setTodos(todos => [...todos, todo]);
  }

  function deleteTodo(todo) {
    setTodos(todos => {
      const newTodos = [...todos];
      return newTodos.filter(el => el.id !== todo.id);
    });
  }

  console.log('rendering <Todos /> component')

  return (
    <div className="todos">
      <TodoForm addTodo={addTodo} />
      <div>
        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}