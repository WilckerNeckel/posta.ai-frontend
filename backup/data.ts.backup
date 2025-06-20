import { nanoid } from "@reduxjs/toolkit";
import { getColorByIndex } from "../../helpers/getColumnColor";
import { Board } from "../interfaces/board.interface";

const pendingId = nanoid();
const inProgressId = nanoid();
const completedId = nanoid();

export const data: Board[] = [
  {
    id: nanoid(),
      name: "Projeto Kanban",
    columns: [
      {
        id: pendingId,
        name: "Pendente",
        color: getColorByIndex(0),
        tasks: Array.from({ length: 2 }, (_, i) => ({
          title: `Task pending ${i + 1}`,
          id: nanoid(),
          description: "Task description",
          status: pendingId,
          subtasks: [],
        })),
      },
      {
        id: inProgressId,
        name: "Em progresso",
        color: getColorByIndex(1),
        tasks: Array.from({ length: 3 }, (_, i) => ({
          title: `Task in progress ${i + 1}`,
          id: nanoid(),
          description: "Task description",
          status: inProgressId,
          subtasks: [],
        })),
      },
      {
        id: completedId,
        name: "Concluído",
        color: getColorByIndex(2),
        tasks: Array.from({ length: 4 }, (_, i) => ({
          title: `Task completed ${i + 1}`,
          id: nanoid(),
          description: "Task description",
          status: completedId,
          subtasks: [],
        })),
      },
    ],
  },
];
