import React, { useContext, useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { AppContext } from "../Container";

export default () => {
  const { setTasks, tasks } = useContext(AppContext);
  const [text, setText] = useState("");

  useEffect(() => {
    const list = getListLocalStorage();
    if (list) {
      const taskArray = JSON.parse(list);
      setTasks([...taskArray]);
    }
  }, []);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd() {
    if (!text.trim()) return;
    setTasks([{ id: Math.random(4), text }, ...tasks]);
    setText("");
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      handleAdd();
    }
  }

  function getListLocalStorage() {
    return localStorage.getItem("TASKS");
  }

  return (
    <div className="d-flex py-3">
      <input
        type="text"
        className="mr-2 input-text"
        placeholder="Nova tarefa..."
        id="input-task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => handleEnter(e)}
      />
      <button
        className="btn button-add"
        id="btn-add"
        onClick={() => handleAdd()}
      >
        <FiPlus color="rgb(25, 24, 31)" />
      </button>
    </div>
  );
};
