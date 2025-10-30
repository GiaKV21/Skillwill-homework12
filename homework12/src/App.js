import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addTask = () => {
    const text = task.trim();
    if (!text) return;
    const newItem = { id: Date.now(), text };
    setTodo((prev) => [newItem, ...prev]);
    setTask("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") addTask();
  };

  const completeTask = (id) => {
    const item = todo.find((t) => t.id === id);
    if (!item) return;
    setTodo((prev) => prev.filter((t) => t.id !== id));
    setCompleted((prev) => [item, ...prev]);
  };

  const moveBackToTodo = (id) => {
    const item = completed.find((t) => t.id === id);
    if (!item) return;
    setCompleted((prev) => prev.filter((t) => t.id !== id));
    setTodo((prev) => [item, ...prev]);
  };

  const deleteTask = (id) => {
    setCompleted((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="brand">
          <span className="brand-accent">●</span> To-Do Board
        </h1>
        <div className="input-row">
          <input
            className="task-input"
            type="text"
            value={task}
            placeholder="Add a new task…"
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleEnter}
            aria-label="Task text"
          />
          <button className="btn add" onClick={addTask} aria-label="Add task">
            Add
          </button>
        </div>
      </header>

      <main className="board">
        <section className="column">
          <div className="column-header">
            <h2>To Do</h2>
            <span className="counter">{todo.length}</span>
          </div>

          {todo.length === 0 ? (
            <EmptyState text="No tasks yet. Add your first task above." />
          ) : (
            <ul className="list">
              {todo.map((item) => (
                <li key={item.id} className="card">
                  <span className="card-text">{item.text}</span>
                  <div className="card-actions">
                    <button
                      className="btn complete"
                      onClick={() => completeTask(item.id)}
                      aria-label="Mark as complete"
                      title="Complete"
                    >
                      ✓ Complete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="column">
          <div className="column-header">
            <h2>Completed</h2>
            <span className="counter">{completed.length}</span>
          </div>

          {completed.length === 0 ? (
            <EmptyState text="Nothing here yet. Keep going!" />
          ) : (
            <ul className="list">
              {completed.map((item) => (
                <li key={item.id} className="card card-done">
                  <span className="card-text">{item.text}</span>
                  <div className="card-actions">
                    <button
                      className="btn ghost"
                      onClick={() => moveBackToTodo(item.id)}
                      aria-label="Move back to To Do"
                      title="Move to To Do"
                    >
                      ↩ Move to To Do
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => deleteTask(item.id)}
                      aria-label="Delete task"
                      title="Delete"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <small>
          Tip: Press <kbd>Enter</kbd> to add a task.
        </small>
      </footer>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <p className="empty-text">{text}</p>
    </div>
  );
}
