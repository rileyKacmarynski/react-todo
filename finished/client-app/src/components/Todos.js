import React, { useState, useEffect } from 'react';
import uuidv1 from 'uuid/v1';
import axios from 'axios';

import TodoForm from './TodoForm';
import Todo from './Todo';
import Loader from './Loader';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);


      const result = await axios.get('/todos')
      
      setTodos(result.data);
      setIsLoading(false);
    }

    fetchTodos();
  }, [])

  async function addTodo(description) {
    const todo = { id: uuidv1(), description };

    var res = await axios.post('/todos', todo);
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
    {isLoading 
      ? <Loader />
      : <div>
          <ul>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
            ))}
          </ul>
        </div>
    }

    </div>
  );
}

export default Todos;