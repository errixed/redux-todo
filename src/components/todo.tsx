import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Todo, addTodo, removeTodo, todoSelector } from "./todoSlice";

function TodoList() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const selectedTodos = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTodos(selectedTodos);
  }, [selectedTodos]);

  function handleAddTodo() {
    const newTodo = {
      id: (todos.length + 1).toString(),
      title: newTodoTitle,
      description: newTodoDescription,
    };
    dispatch(addTodo(newTodo));
  }
  return (
    <div>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.id} | {todo.title} | {todo.description}
          <br />
          <button onClick={() => dispatch(removeTodo(todo.id))}>
            delete
          </button>
        </li>
      ))}
      <div>
        <input
          type="text"
          placeholder="Title"
          aria-label="title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Description"
          aria-label="description"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        ></input>
        <button type="submit" className="btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </div>
  );
}
export default TodoList;