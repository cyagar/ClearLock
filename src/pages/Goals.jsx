import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Goals.css";

function Goals() {
  // Text input from user
  const [input, setInput] = useState("");
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  // Edit state to manage existing todos
  const [editInput, setEditInput] = useState("");

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo to the list
  const addTodo = (text) => {
    // Prevent adding empty or whitespace-only todos
    if (!text || /^\s*$/.test(text)) return;

    // new todo object
    const newTodo = {
      id: uuidv4(),
      task: text,
      completed: false,
      isEditing: false,
    };

    // Update the todos state by adding the new todo to the existing array
    setTodos([...todos, newTodo]);
  };

  // Handler for changes in the new todo input field
  const handleChange = (e) => setInput(e.target.value);

  // Handler for the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput("");
  };

  // Function to delete a task by its unique ID
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to toggle the 'completed' status of a task
  const completeTask = (id) => {
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to set a task into editing mode
  const editTask = (id) => {
    const taskToEdit = todos.find((task) => task.id === id);
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
    setEditInput(taskToEdit.task);
  };

  // Handler for changes in the edit input field
  const handleEditChange = (e) => setEditInput(e.target.value);

  // Function to save the edited task
  const saveEdit = (id) => {
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, task: editInput, isEditing: false } : task
      )
    );
    setEditInput("");
  };

  return (
    <div className="goals-container">
      <h1>To-Do</h1>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={input}
          placeholder="What's the plan for today?"
          onChange={handleChange}
        />
        <button type="submit" className="todo-btn">
          Add
        </button>
      </form>

      <ul>
        {todos.map((taskObj) => (
          <li className={`li ${taskObj.completed ? "complete" : ""}`} key={taskObj.id}>
            {/* Conditional rendering: show edit input if isEditing is true, otherwise show task details */}
            {taskObj.isEditing ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={handleEditChange}
                  className="edit-input"
                />
                <button
                  className="save-btn"
                  onClick={() => saveEdit(taskObj.id)}
                >
                  Save
                </button>
              </>
            ) : (
              // Fragment for elements shown when not editing
              <>
                <span className={taskObj.completed ? "text-completed" : "text"}>
                  {taskObj.task}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => editTask(taskObj.id)}
                >
                  ✏️
                </button>
                <button
                  className="complete-btn"
                  onClick={() => completeTask(taskObj.id)}
                >
                  {taskObj.completed ? "↻" : "✔"}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(taskObj.id)}
                >
                  ✖
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;