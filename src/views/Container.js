import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import List from "./List";
import Add from "./Add";

export const AppContext = createContext();

function Container() {
  const [tasks, setTasks] = useState([]);

  return (
    <DndProvider backend={Backend}>
      <AppContext.Provider value={{ tasks, setTasks }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="title">Tarefas diárias</h1>
              <span className="tip">
                Utilize o mouse para arrastar/soltar e ordene a lista da maneira
                que desejar.
              </span>
              <Add />
              <List />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </DndProvider>
  );
}

export default Container;
