import React, { useState, useEffect } from 'react';
import uuidv1 from 'uuid/v1';
import axios from 'axios';

import TodoForm from './TodoForm';
import Todo from './Todo';
import Loader from './Loader';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchTodos = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get('/todos', {CancelToken: source.token});
        if(!didCancel){
          setTodos(result.data);
          setIsLoading(false);
        }
      } catch(e) {
        if(!didCancel){
          setIsError(true);
          setIsLoading(false);
        } else {
          console.log('Request Canceled', e.message);
        }
      }
    }

    fetchTodos();

    return () =>{
      didCancel = true;
      source.cancel('Operation canceled by the user.');
    }
  }, [])

  const addTodo = async(description) => {
    const id = uuidv1();
    const todo = { id, description };
    setTodos(todos => [...todos, todo]);
    
    try {
      await axios.post('/todos', todo);
      console.log('todo added')
    } catch(e) {
      setIsError(true); 
      setTodos(todos => {
        const newTodos = [...todos];
        return newTodos.filter(el => el.id !== id);
      });
    }
  }

  const deleteTodo = async (id) => {
      setIsError(false);
      const deletedTodo = todos.filter(el => el.id === id);
      setTodos(todos => {
        const newTodos = [...todos];
        return newTodos.filter(el => el.id !== id);
      });

      try {
        await axios.delete(`/todos/${id}`)
        console.log('deleted')
      } catch {
        setIsError(true)
        setTodos(todos => [...todos, deletedTodo]);
      }
  }

  console.log('rendering <Todos /> component')

  return (
    <div className="todos">
    <TodoForm addTodo={addTodo} />
    {isError && <p>Error communicating with server</p>}
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