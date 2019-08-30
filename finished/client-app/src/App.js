import React from 'react';
import './App.css';
import Todos from './components/Todos';

const App = () => {
  return (
    <div className="container">
      <nav className="grid-item" />
      <main className="grid-item">
        <Todos />
      </main>
      <footer className="grid-item" />
    </div>
  );
}

export default App;
