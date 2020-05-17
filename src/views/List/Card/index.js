import React, { useRef, useContext, useState } from "react";
import { FiTrash, FiEdit3, FiSave } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "../ItemTypes";

import { AppContext } from "../../Container";

const Card = ({ id, text, index, moveCard }) => {
  const { tasks, setTasks } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [taskText, setTaskText] = useState(text);

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Não substitua itens por eles mesmos
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determinar retângulo em seixos
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Obter meio vertical
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determinar a posição do mouse
      const clientOffset = monitor.getClientOffset();
      // Colocar os pixels no topo
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Faça o movimento apenas quando o mouse tiver cruzado metade da altura dos itens
      // Ao arrastar para baixo, mova-se apenas quando o cursor estiver abaixo de 50%
      // Ao arrastar para cima, mova-se apenas quando o cursor estiver acima de 50%
      // Arrastando para baixo
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Arrastando para cima
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Hora de realmente executar a ação
      moveCard(dragIndex, hoverIndex);
      // Nota: estamos alterando o item do monitor aqui!
      // Geralmente é melhor evitar mutações,
      // mas é bom aqui por uma questão de desempenho
      // para evitar pesquisas caras de índice.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  function handleDeleteTask(item) {
    const list = tasks.filter((task) => task.id !== item.id);
    setTasks([...list]);
  }

  function handleUpdateTask(data) {
    let list = tasks;
    list.map((item) => {
      if (item.id === data.id) {
        item.text = data.taskText;
      }
    });
    setTasks([...list]);
    handleEditTask();
  }

  function handleEditTask() {
    setIsEdit(() => !isEdit);
  }

  return (
    <li ref={ref} style={{ opacity }} className="list-group-item">
      {!isEdit ? (
        taskText
      ) : (
        <input
          type="text"
          className="input-text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      )}
      <div className="d-flex">
        {!isEdit ? (
          <>
            <button className="button-none" onClick={() => handleEditTask()}>
              <FiEdit3 />
            </button>
            <button
              className="button-none"
              onClick={() => handleDeleteTask({ id, taskText })}
            >
              <FiTrash />
            </button>
          </>
        ) : (
          <>
            <button
              className="button-none ml-2"
              onClick={() => handleUpdateTask({ id, taskText })}
            >
              <FiSave />
            </button>
            <button className="button-none" onClick={() => handleEditTask()}>
              <MdClose size={20} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Card;
