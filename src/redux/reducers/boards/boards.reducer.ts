// ============================================
// BOARDS REDUCER COM CARREGAMENTO ASSÍNCRONO
// ============================================
// 
// 🔄 MUDANÇA: Adicionado carregamento de dados via API
// ❌ ANTES: Dados vindos de data.ts local
// ✅ AGORA: Dados carregados do mock JSON via API
// 
// 🚧 FUTURO: Actions assíncronas comentadas para persistência

// import { current } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk, nanoid, PayloadAction } from "@reduxjs/toolkit";
// import { data } from "../../../config/data/data"; // ❌ Não usado mais
import {
  Board,
  Column,
  Task,
} from "../../../config/interfaces/board.interface";
import { arrayInsert } from "../../../helpers/arrayInsert";
import { getColorByIndex } from "../../../helpers/getColumnColor";
import {
  CreateBoardBody,
  CreateTaskBody,
  UpdateBoardBody,
  UpdateTaskBody,
} from "./request.interfaces";
import { BoardsService } from "../../../services/boardsService";

// ============================================
// STATE INTERFACE COM LOADING/ERROR
// ============================================

interface InitialState {
  boards: Board[];
  activeBoard: Board | null;
  activeTask: Task | null;
  filteredTasks: Task[];
  isFiltered: boolean;
  // 🆕 Estados para controle de carregamento
  loading: boolean;
  error: string | null;
}

// ============================================
// INITIAL STATE (VAZIO - SERÁ CARREGADO)
// ============================================

const initialState: InitialState = {
  boards: [], // ✅ Começa vazio, será populado pela API
  activeTask: null,
  activeBoard: null,
  filteredTasks: [],
  isFiltered: false,
  // 🆕 Estados iniciais de loading
  loading: false,
  error: null,
};

// ============================================
// ASYNC THUNKS - ACTIONS ASSÍNCRONAS
// ============================================

/**
 * ✅ FUNCIONAL: Carrega boards da API mock
 * Esta action está funcional e carrega dados do JSON
 */
export const loadBoardsFromAPI = createAsyncThunk(
  'boards/loadFromAPI',
  async (_, { rejectWithValue }) => {
    try {
      const boards = await BoardsService.getBoards();
      
      if (boards.length === 0) {
        throw new Error('Nenhum board encontrado na API');
      }
      
      return boards;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return rejectWithValue(message);
    }
  }
);

// ============================================
// ASYNC THUNKS COMENTADAS (FUTURO)
// ============================================

/**
 * 🚧 FUTURO: Criar board via API
 * Descomente quando backend estiver pronto
 */
// export const createBoardAsync = createAsyncThunk(
//   'boards/createAsync',
//   async (boardData: CreateBoardBody, { rejectWithValue }) => {
//     try {
//       const newBoard = await BoardsService.createBoard(boardData);
//       return newBoard;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao criar board';
//       return rejectWithValue(message);
//     }
//   }
// );

/**
 * 🚧 FUTURO: Atualizar board via API
 * Descomente quando backend estiver pronto
 */
// export const updateBoardAsync = createAsyncThunk(
//   'boards/updateAsync',
//   async ({ boardId, boardData }: { boardId: string; boardData: UpdateBoardBody }, { rejectWithValue }) => {
//     try {
//       const updatedBoard = await BoardsService.updateBoard(boardId, boardData);
//       return updatedBoard;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao atualizar board';
//       return rejectWithValue(message);
//     }
//   }
// );

/**
 * 🚧 FUTURO: Deletar board via API
 * Descomente quando backend estiver pronto
 */
// export const deleteBoardAsync = createAsyncThunk(
//   'boards/deleteAsync',
//   async (boardId: string, { rejectWithValue }) => {
//     try {
//       await BoardsService.deleteBoard(boardId);
//       return boardId;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao deletar board';
//       return rejectWithValue(message);
//     }
//   }
// );

export const createTaskAsync = createAsyncThunk(
  'boards/createTaskAsync',
  async (taskData: CreateTaskBody, { rejectWithValue }) => {
    try {
      const newTask = await BoardsService.createTask(taskData);
      return newTask;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar task';
      return rejectWithValue(message);
    }
  }
);

/**
 * 🚧 FUTURO: Atualizar task via API
 * Descomente quando backend estiver pronto
 */
// export const updateTaskAsync = createAsyncThunk(
//   'boards/updateTaskAsync',
//   async ({ taskId, taskData }: { taskId: string; taskData: UpdateTaskBody }, { rejectWithValue }) => {
//     try {
//       const updatedTask = await BoardsService.updateTask(taskId, taskData);
//       return updatedTask;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao atualizar task';
//       return rejectWithValue(message);
//     }
//   }
// );

/**
 * 🚧 FUTURO: Deletar task via API
 * Descomente quando backend estiver pronto
 */
// export const deleteTaskAsync = createAsyncThunk(
//   'boards/deleteTaskAsync',
//   async (taskId: string, { rejectWithValue }) => {
//     try {
//       await BoardsService.deleteTask(taskId);
//       return taskId;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao deletar task';
//       return rejectWithValue(message);
//     }
//   }
// );

/**
 * 🚧 FUTURO: Criar coluna via API
 * Descomente quando backend estiver pronto
 */
// export const createColumnAsync = createAsyncThunk(
//   'boards/createColumnAsync',
//   async (columnData: CreateColumnBody, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as RootState;
//       const boardId = columnData.boardId || state.boards.activeBoard?.id;
//       
//       if (!boardId) {
//         throw new Error('Board ID é obrigatório para criar coluna');
//       }
//       
//       const newColumn = await BoardsService.createColumn(boardId, columnData);
//       return newColumn;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao criar coluna';
//       return rejectWithValue(message);
//     }
//   }
// );

/**
 * 🚧 FUTURO: Atualizar coluna via API
 * Descomente quando backend estiver pronto
 */
// export const updateColumnAsync = createAsyncThunk(
//   'boards/updateColumnAsync',
//   async ({ columnId, columnData }: { columnId: string; columnData: Partial<CreateColumnBody> }, { rejectWithValue }) => {
//     try {
//       const updatedColumn = await BoardsService.updateColumn(columnId, columnData);
//       return updatedColumn;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao atualizar coluna';
//       return rejectWithValue(message);
//     }
//   }
// );

/**
 * 🚧 FUTURO: Deletar coluna via API
 * Descomente quando backend estiver pronto
 */
// export const deleteColumnAsync = createAsyncThunk(
//   'boards/deleteColumnAsync',
//   async (columnId: string, { rejectWithValue }) => {
//     try {
//       await BoardsService.deleteColumn(columnId);
//       return columnId;
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Erro ao deletar coluna';
//       return rejectWithValue(message);
//     }
//   }
// );

// ============================================
// SLICE COM REDUCERS SÍNCRONOS
// ============================================

export const boardsReducer = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // ============================================
    // REDUCERS LOCAIS (MANTIDOS IGUAIS)
    // ============================================
    // 📝 NOTA: Todos os reducers abaixo continuam funcionando
    // normalmente para operações locais (sem persistência)
    
    setActiveBoard: (state, action: PayloadAction<Board | null>) => {
      state.activeBoard = action.payload;
      // Clear filters when switching boards
      state.filteredTasks = [];
      state.isFiltered = false;
    },
    setActiveTask: (state, action: PayloadAction<Task | null>) => {
      state.activeTask = action.payload;
    },
    
    // 🔄 ESTES REDUCERS FAZEM MUDANÇAS LOCAIS (não persistem)
    addNewBoard: (state, { payload }: PayloadAction<CreateBoardBody>) => {
      const columns: Board["columns"] = payload.columns.map(
        (column, index) => ({
          tasks: [],
          id: nanoid(),
          name: column,
          color: getColorByIndex(index),
        })
      );

      const board: Board = {
        columns,
        id: nanoid(),
        name: payload.name,
      };

      state.boards.unshift(board);
      state.activeBoard = board;
      // Clear filters when adding new board
      state.filteredTasks = [];
      state.isFiltered = false;
    },
    deleteBoard: (state, { payload }: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== payload);

      const [firstBoard] = state.boards;
      firstBoard
        ? (state.activeBoard = firstBoard)
        : (state.activeBoard = null);
      
      // Clear filters when deleting board
      state.filteredTasks = [];
      state.isFiltered = false;
    },
    updateBoard: (state, { payload }: PayloadAction<UpdateBoardBody>) => {
      const board = state.boards.find(
        (boardItem) => boardItem.id === payload.id
      );
      if (!board) return;
      const columnsTasks: Record<string, Task[]> = {};

      board.columns.forEach((column) => {
        columnsTasks[column.id] = column.tasks;
      });

      const newColumns: Column[] = payload.columns.map((column, index) => ({
        id: column.columnId ?? nanoid(),
        name: column.columnName,
        tasks: column.columnId ? columnsTasks[column.columnId] || [] : [],
        color: getColorByIndex(index),
      }));

      board.name = payload.name;
      board.columns = newColumns;
      state.activeBoard = board;
    },
    
    // ============================================
    // ✅ NOVA ACTION: ADICIONAR COLUNA
    // ============================================
    
    /**
     * ✅ FUNCIONAL: Adiciona nova coluna ao board ativo
     * - Apenas atualiza Redux (não persiste)
     * - Usa próxima cor disponível
     * - Sincroniza com array de boards
     */
    addNewColumn: (state, { payload }: PayloadAction<{ name: string }>) => {
      if (!state.activeBoard) return;
      
      const newColumn: Column = {
        id: nanoid(),
        name: payload.name,
        tasks: [],
        color: getColorByIndex(state.activeBoard.columns.length),
      };
      
      state.activeBoard.columns.push(newColumn);
      
      // Sincroniza com array de boards
      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    
    addNewTask: (state, { payload }: PayloadAction<CreateTaskBody>) => {
      if (!state.activeBoard) return;

      const column = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.columnId
      );

      if (!column) return;

      const subtasks: Task["subtasks"] = payload.subtasks.map((subtask) => ({
        id: nanoid(),
        title: subtask,
        isCompleted: false,
      }));

      const task: Task = {
        subtasks,
        id: nanoid(),
        status: column.id,
        title: payload.title,
        description: payload.description || "",
      };

      column.tasks.push(task);

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    updateTask: (state, { payload }: PayloadAction<UpdateTaskBody>) => {
      if (!state.activeBoard) return;

      const allTasks = state.activeBoard.columns.reduce<Task[]>(
        (acc, column) => [...acc, ...column.tasks],
        []
      );

      const task = allTasks.find((taskItem) => taskItem.id === payload.id);

      if (!task) return;

      const subtasks: Task["subtasks"] = payload.subtasks.map((subtask) => ({
        title: subtask.title,
        id: subtask.id ?? nanoid(),
        isCompleted: subtask.isCompleted,
      }));

      task.title = payload.title;
      task.description = payload.description || "";
      task.subtasks = subtasks;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    completeSubtask: (state, { payload }: PayloadAction<string>) => {
      if (!state.activeTask || !state.activeBoard) return;

      const activeTaskColumn = state.activeBoard.columns.find(
        (column) => column.id === state.activeTask?.status
      );

      const subtask = state.activeTask.subtasks.find(
        (subtaskItem) => subtaskItem.id === payload
      );

      if (!subtask || !activeTaskColumn) return;

      subtask.isCompleted = !subtask.isCompleted;
      activeTaskColumn.tasks.forEach((task) => {
        if (task.id !== state.activeTask?.id) return;
        task.subtasks = state.activeTask.subtasks;
      });

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    changeTaskStatus: (state, { payload }: PayloadAction<string>) => {
      if (!state.activeTask || !state.activeBoard) return;

      if (state.activeTask.status === payload) return;

      const columnSelected = state.activeBoard.columns.find(
        (column) => column.id === payload
      );

      const columnActiveTask = state.activeBoard.columns.find(
        (column) => column.id === state.activeTask?.status
      );

      if (!columnSelected || !columnActiveTask) return;

      columnActiveTask.tasks = columnActiveTask.tasks.filter(
        (task) => task.id !== state.activeTask?.id
      );

      columnSelected.tasks.push(state.activeTask);
      state.activeTask.status = columnSelected.id;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    deleteTask: (state, { payload }: PayloadAction<Task>) => {
      if (!state.activeBoard) return;

      const column = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.status
      );

      if (!column) return;

      column.tasks = column.tasks.filter((task) => task.id !== payload.id);

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    setColumnsOder: (state, { payload }: PayloadAction<Column[]>) => {
      if (!state.activeBoard) return;

      state.activeBoard.columns = payload;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    setTasksOrder: (state, { payload }: PayloadAction<Task[]>) => {
      if (!state.activeBoard || !state.activeBoard) return;
      const columnId = payload[0]?.status;

      const column = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === columnId
      );

      if (!column) return;

      column.tasks = payload;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    setTaskStatusWithDrag: (
      state,
      {
        payload,
      }: PayloadAction<{
        taskId: string;
        oldColumnId: string;
        newColumnId: string;
        newPosition: number;
      }>
    ) => {
      if (!state.activeBoard) return;

      const oldColumn = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.oldColumnId
      );

      const newColumn = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.newColumnId
      );

      if (!oldColumn || !newColumn) return;

      const task = oldColumn.tasks.find(
        (taskItem) => taskItem.id === payload.taskId
      );

      if (!task) return;

      task.status = newColumn.id;

      oldColumn.tasks = oldColumn.tasks.filter(
        (taskItem) => taskItem.id !== payload.taskId
      );

      newColumn.tasks = arrayInsert(newColumn.tasks, task, payload.newPosition);

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    filterTasks: (state, { payload }: PayloadAction<string>) => {
      if (!state.activeBoard) return;
      
      const searchTerms = payload.toLowerCase().trim().split('|').filter(term => term.length > 0);
      
      if (searchTerms.length === 0) {
        // If no search terms, clear filtering
        state.filteredTasks = [];
        state.isFiltered = false;
        return;
      }
      
      // Collect all tasks from all columns and filter by title
      const allTasks = state.activeBoard.columns.reduce<Task[]>(
        (acc, column) => [...acc, ...column.tasks],
        []
      );
      
      // Use OR logic - task matches if it contains ANY of the search terms as complete phrases
      const filtered = allTasks.filter(task => 
        searchTerms.some(term => task.title.toLowerCase().includes(term.trim()))
      );
      
      state.filteredTasks = filtered;
      state.isFiltered = true;
    },
    clearFilter: (state) => {
      state.filteredTasks = [];
      state.isFiltered = false;
    },
  },
  
  // ============================================
  // EXTRA REDUCERS - HANDLE ASYNC ACTIONS
  // ============================================
  extraReducers: (builder) => {
    // ✅ LOAD BOARDS (FUNCIONAL)
    builder
      .addCase(loadBoardsFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('🔄 Carregando boards da API...');
      })
      .addCase(loadBoardsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = action.payload;
        
        // Auto-seleciona o primeiro board se existir
        if (action.payload.length > 0) {
          state.activeBoard = action.payload[0];
          console.log('✅ Boards carregados com sucesso:', action.payload.length, 'board(s)');
          console.log('🎯 Board ativo:', action.payload[0].name);
        }
      })
      .addCase(loadBoardsFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro ao carregar boards';
        state.boards = [];
        state.activeBoard = null;
        console.error('❌ Erro ao carregar boards:', state.error);
      })
      // ✅ CREATE TASK (BACKEND)
      .addCase(createTaskAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        if (!state.activeBoard) return;
        const column = state.activeBoard.columns.find(
          (columnItem) => columnItem.id === action.payload.status
        );
        if (!column) return;

        column.tasks.push(action.payload);

        state.boards.forEach((board) => {
          if (board.id !== state.activeBoard?.id) return;
          board.columns = state.activeBoard.columns;
        });
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Erro ao criar task';
      });

    // 🚧 FUTURO: Descomente quando backend estiver pronto
    // 
    // // CREATE BOARD
    // builder
    //   .addCase(createBoardAsync.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(createBoardAsync.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.boards.unshift(action.payload);
    //     state.activeBoard = action.payload;
    //   })
    //   .addCase(createBoardAsync.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
    // 
    // // UPDATE BOARD
    // builder
    //   .addCase(updateBoardAsync.fulfilled, (state, action) => {
    //     const index = state.boards.findIndex(board => board.id === action.payload.id);
    //     if (index !== -1) {
    //       state.boards[index] = action.payload;
    //       state.activeBoard = action.payload;
    //     }
    //   });
    // 
    // // DELETE BOARD
    // builder
    //   .addCase(deleteBoardAsync.fulfilled, (state, action) => {
    //     state.boards = state.boards.filter(board => board.id !== action.payload);
    //     const [firstBoard] = state.boards;
    //     state.activeBoard = firstBoard || null;
    //   });
  },
});

export const {
  addNewTask,
  deleteTask,
  updateTask,
  addNewBoard,
  deleteBoard,
  updateBoard,
  setTasksOrder,
  setActiveTask,
  setColumnsOder,
  setActiveBoard,
  completeSubtask,
  changeTaskStatus,
  setTaskStatusWithDrag,
  filterTasks,
  clearFilter,
  addNewColumn
} = boardsReducer.actions;
