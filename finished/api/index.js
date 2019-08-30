const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

let todos = [];

app.use((req, res, next) => {
  const logNext = () => {
    console.log("...We back");
    next();
  };

  console.log("Hold up...");
  setTimeout(logNext, 1000);
});

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello Express"));

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  let todo = req.body;
  todos = [...todos, todo];
  res.sendStatus(200);
});

app.delete("/todos/:todoId", (req, res) => {
  todos = todos.filter(todo => todo.id == req.params.todoId);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
