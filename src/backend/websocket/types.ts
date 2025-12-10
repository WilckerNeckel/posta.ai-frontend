import { BoardTaskDTO } from "../board/BoardApi";

export type WebSocketPayloads = {
  DISCIPLINE_TASK_CREATED: BoardTaskDTO & {
    disciplineId: string;
    disciplineName: string;
  };
};
