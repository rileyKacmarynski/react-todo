const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

let id = 1;
const todos = [
  {
    id: 1,
    description: "Example todo"
  }
];

app.use(cors());

app.get("/", (req, res) => res.send("Hello Express"));

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  let todo = { id, description: "hey" };
  todos = [...todos, todo];
  res.json(todo);
});

app.delete("/todos/:todoId", (req, res) => {
  todos = todos.filter(todo => todo.id == req.params.todoId);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
