import React, { useState } from 'react';

export default function TodoForm({ addTodo }) {
  const [todoText, setTodoText] = useState('');

  const submit = e => {
    e.preventDefault();
    addTodo(todoText);
    setTodoText('');
  };

  return (
    <form className="todo-form">
      <input
        type="text"
        placeholder="TO:DO"
        onChange={e => setTodoText(e.target.value)}
        value={todoText}
      />
      <button type="submit" onClick={e => submit(e)}>
        <i className="material-icons">send</i>
      </button>
    </form>
  );
}
