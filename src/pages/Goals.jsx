import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Goals.css";

function Goals() {
  // Text input from user
  const [input, setInput] = useState("");
  // Store todos, load todos from localStorage on initial render
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
  // Fade state for todo list animation at the start
  const [fadeIn, setFadeIn] = useState(false);

  // Activiate fade animation on initial render
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Whenver todos changes, save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo to the list
  const addTodo = (text) => {
    // Prevent adding empty or whitespace-only todos
    if (!text || /^\s*$/.test(text)) return;

    // Create new todo object
    const newTodo = {
      id: uuidv4(),
      task: text,
      completed: false,
      isEditing: false,
      isAdding: true,
    };

    // Update the todos state by adding the new todo to the existing array
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Remove the isAdding flag by object destructuring after the animation duration (this is used for the add task animation)
    setTimeout(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const { isAdding, ...rest } = todo;
          return todo.id === newTodo.id ? rest : todo;
        })
      );
    }, 700);
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
    // Iterate and for the matching id create a new object with an isRemoving field (this is used for the remove task animation)
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isRemoving: true } : todo
      )
    );
    // Remove by filtiring the task from the list after the animation duration
    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, 700);
  };

  // Function to toggle the completed status of a task
  const completeTask = (id) => {
    // Iterate and for the matching id flip completed status
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to set a task into editing mode
  const editTask = (id) => {
    // Find task
    const taskToEdit = todos.find((task) => task.id === id);
    // Iterate and for the matching id set the tasks isEditing to true
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
    // Fill in the editInput state with the text that is being edited
    setEditInput(taskToEdit.task);
  };

  // Handler for changes in the edit input field
  const handleEditChange = (e) => setEditInput(e.target.value);

  // Function to save the edited task
  const saveEdit = (id) => {
    // Iterate and for the matching id set the task to editInput and set isEditing back to false
    setTodos(
      todos.map((task) =>
        task.id === id ? { ...task, task: editInput, isEditing: false } : task
      )
    );
    // Clear editInput state after save
    setEditInput("");
  };

  return (
    // Fade-in class conditionally applied for initial animation
    <div className={`goals-container ${fadeIn ? "fade-in" : ""}`}>
      {/* Main heading */}
      <h1>To-Do</h1>

      {/* Form for adding new to-do items */}
      <form className="todo-form" onSubmit={handleSubmit}>
        {/* Input field for typing a new to-do item */}
        <input
          type="text"
          className="todo-input"
          value={input}
          placeholder="What's the plan for today?"
          onChange={handleChange}
        />
        {/* Button to submit new to-do item */}
        <button type="submit" className="todo-btn">
          Add
        </button>
      </form>

      {/* Unordered list to display all the to-do items */}
      <ul>
        {/* Iterates over the todos array to render each task as a list item */}
        {todos.map((taskObj) => (
          // Each list item represents a single to-do task, dynamic classing used for tracking and animations
          <li
            className={`li ${taskObj.completed ? "complete" : ""} ${
              taskObj.isAdding ? "task-entering" : ""
            } ${taskObj.isRemoving ? "task-exiting" : ""}`}
            key={taskObj.id}
          >
            {/* Conditional rendering: show edit input if isEditing is true, otherwise show task details */}
            {taskObj.isEditing ? (
              <>
                {/* Input field for editing an existing task */}
                <input
                  type="text"
                  value={editInput}
                  onChange={handleEditChange}
                  className="edit-input"
                />
                {/* Button to save edited task */}
                <button
                  className="save-btn"
                  onClick={() => saveEdit(taskObj.id)}
                >
                  Save
                </button>
              </>
            ) : (
              // Fragment used to group elements shown when not in editing mode
              <>
                {/* Span to display task text */}
                <span className={taskObj.completed ? "text-completed" : "text"}>
                  {taskObj.task}
                </span>
                {/* Button to activate editing mode for task */}
                <button
                  className="edit-btn"
                  onClick={() => editTask(taskObj.id)}
                >
                  ✏️
                </button>
                {/* Button to toggle completed status */}
                <button
                  className="complete-btn"
                  onClick={() => completeTask(taskObj.id)}
                >
                  {taskObj.completed ? "↻" : "✔"}
                </button>
                {/* Button to delete task */}
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