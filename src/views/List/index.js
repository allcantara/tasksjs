import React, { useContext, useCallback } from "react";
import update from "immutability-helper";
import Card from "./Card";

import { AppContext } from "../Container";

const Container = () => {
  const { tasks, setTasks } = useContext(AppContext);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = tasks[dragIndex];
      setTasks(
        update(tasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [tasks]
  );

  return (
    <div className="list-area">
      <ul className="list-group list-group-flush" id="ul-list">
        {tasks.map((task, i) => (
          <Card
            key={task.id}
            index={i}
            id={task.id}
            text={task.text}
            moveCard={moveCard}
          />
        ))}
      </ul>
    </div>
  );
};
export default Container;
