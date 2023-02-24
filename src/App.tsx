import React, { useState } from "react";
import "./App.css";

export const AppTest = () => {
  // 状態指定
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // 型指定
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // 入力値の取得
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  // 送信時の挙動
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodos = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    if (inputValue === "") {
      return "";
    } else {
      setTodos([newTodos, ...todos]);
    }
    setInputValue("");
  };

  // 編集の挙動
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // チェックボックスの挙動
  const handleCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // 削除の挙動
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>TypeScript Todo List</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="inputText"
            onChange={(e) => handleChange(e)}
            value={inputValue}
          />
          <input type="submit" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                disabled={todo.checked}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <input
                type="checkbox"
                onChange={() => handleCheck(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
