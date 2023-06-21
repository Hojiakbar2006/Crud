import React from "react";
import "./App.css";
import { useState } from "react";
import { Modal } from "./Modal/Modal";
import DeleteImg from "./Delete.svg";
import Edit from "./Edit.svg";

export function App() {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState([]);
  const [todos, setTodos] = useState([]);

  // let todos = JSON.parse(localStorage.getItem("list")) || [];

  //Add
  function AddTodos(e) {
    e.preventDefault();
    const todoValue = e.target.todo.value.trim();

    if (todoValue.length) {
      setTodos([
        ...todos,
        {
          text: todoValue,
          time: getTime(),
          completed: false,
        },
      ]);
      e.target.todo.value = "";
    } else {
      setMessage(["addForm", true]);
      setTimeout(() => {
        setMessage(["addForm", false]);
      }, 2500);
    }
  }
  //Delete

  const Delete = (i) => {};

  //Time

  function getTime() {
    const now = new Date();
    const date = now.getDate();
    const month =
      now.getMonth() + 1 < 10
        ? "0" + (now.getMonth() + 1)
        : now.getMonth() + 1 < 10;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}, ${date}.${month}.${year}`;
  }
  return (
    <>
      <h2 className="date">
        <span>{getTime()}</span>
      </h2>

      <h5 className="time">
        <span></span>
        <span>MM</span>
        <span>
          {" "}
          {setInterval(() => {
            const sec = new Date().getSeconds();
            return `${sec}`;
          }, 1000)}
        </span>
      </h5>

      <h1 className="tittle">Todod Lists</h1>
      <div className="todo">
        <form className="form" onSubmit={AddTodos}>
          <input
            autoComplete="off"
            type="text"
            name="todo"
            placeholder="Type todo..."
          />
          <button type="submit">Add</button>
        </form>
        <p
          className={
            message[0] === "addForm" && message[1] === true
              ? "message show"
              : "message"
          }
        >
          Please, enter some todo
        </p>
        <ul>
          {todos.map((item, i) => {
            return (
              <li key={i}>
                <p>{item.text}</p>
                <div>
                  <p>{item.time}</p>
                  <button>
                    <img src={Edit} alt="" />
                  </button>
                  <button onClick={Delete(i)}>
                    <img src={DeleteImg} alt="" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Modal open={openModal} close={setOpenModal} />
    </>
  );
}
