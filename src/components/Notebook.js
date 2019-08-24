import React from 'react';

import TodoForm from './TodoForm';
import Todos from './Todos';

export default function Notebook() {
  return (
    <div className="todos">
      <TodoForm />
      <Todos />
    </div>
  );
}
