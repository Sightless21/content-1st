"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Test() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "ซักผ้า",
      done: false,
    },
    {
      id: 2,
      text: "ล้างจาน",
      done: false,
    },
  ]);

  function toggle(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }
  function toggle2(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <div key={todo.id} className="flex items-center gap-2">
          <p>{index + 1}.</p>
          <p>{todo.text}</p>
          <Button onClick={() => toggle(todo.id)}>
            {todo.done ? "Mark as Undone" : "Mark as Done"}
          </Button>
        </div>
      ))}
    </div>
  );
}
