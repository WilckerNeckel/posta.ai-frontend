import { BoardTaskDTO } from "../board/BoardApi";

export type WebSocketPayloads = {
  DISCIPLINE_TASK_CREATED: BoardTaskDTO & {
    disciplineId: string;
    disciplineName: string;
  };
  DISCIPLINE_TASK_DELETED: {
    taskId: string;
    disciplineId: string;
    disciplineName: string;
    columnId: string;
    taskTitle: string;
  };
  DISCIPLINE_TASK_UPDATED: {
    id: string;
    titulo: string;
    descricao: string;
    columnId: string;
    disciplineId: string;
    disciplineName: string;
    previousTitle: string;
  };
};
