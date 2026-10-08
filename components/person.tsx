"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Profile() {
  const [todos, setTodos] = useState(["ซักผ้า", "ล้างจาน"]);

  function handlerHomework() {
    setTodos([...todos, "ทำการบ้าน"]);
    todos.push("ทำงาน");
    console.log(todos);
  }

  function handlerRemoveWashdish() {
    setTodos(todos.filter((todo) => todo !== "ล้างจาน"));
  }

  return (
    <div>
      <p>{todos.join(", ")}</p>
      <Button onClick={handlerHomework}>Add Homework</Button>
      <Button onClick={handlerRemoveWashdish}>Remove Wash Dishes</Button>
    </div>
  );
}
