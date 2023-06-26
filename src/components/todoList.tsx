import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Todo, addTodo, removeTodo, todoSelector } from "./todoSlice";

function TodoList() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDescription, setNewTodoDescription] = useState<string>("");
  const selectedTodos = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  const empty = useState<string>("");

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
    <div className="container">

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>

              {todo.description === null ? (
                <td>{todo.description}</td>
              ) : (
                <td>---</td>
              )}

              <td><button onClick={() => dispatch(removeTodo(todo.id))}>
                Done
              </button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <input type="text" placeholder="Title" aria-label="title" value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}>
      </input>

      <input type="text" placeholder="Description" aria-label="description" value={newTodoDescription}
        onChange={(e) => setNewTodoDescription(e.target.value)}>
      </input>
      {newTodoTitle === "" ? (
        <div>
          <p className="text-danger">Title is required</p>
          <button type="submit" onClick={handleAddTodo} disabled>
            Add
          </button>
        </div>
      ) : (
        <button type="submit" onClick={handleAddTodo}>
          Add
        </button>
      )}


    </div>
  );
}
export default TodoList;