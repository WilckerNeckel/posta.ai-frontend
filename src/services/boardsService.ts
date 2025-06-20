import { Board } from '../config/interfaces/board.interface';
import {
  CreateBoardBody,
  CreateTaskBody,
  UpdateBoardBody,
  UpdateTaskBody,
} from '../redux/reducers/boards/request.interfaces';

export class BoardsService {
  private static readonly BASE_URL = '/api';

  // ============================================
  // MÉTODO FUNCIONAL - LEITURA DE DADOS
  // ============================================
  
  /**
   * Busca todos os boards do mock JSON
   * Este método está funcional e busca dados do arquivo público
   */
  static async getBoards(): Promise<Board[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/boards.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const boards = await response.json();
      console.log('✅ Boards carregados do mock JSON:', boards.length, 'board(s)');
      return boards;
      
    } catch (error) {
      console.error('❌ Erro ao buscar boards:', error);
      // Fallback: retorna array vazio em caso de erro
      return [];
    }
  }

  // ============================================
  // MÉTODOS PREPARADOS PARA PERSISTÊNCIA FUTURA
  // ============================================
  
  /**
   * 🚧 FUTURO: Criar novo board
   * Descomente e implemente quando backend estiver pronto
   */
  // static async createBoard(boardData: CreateBoardBody): Promise<Board> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/boards`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(boardData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const newBoard = await response.json();
  //     console.log('✅ Board criado:', newBoard);
  //     return newBoard;
  //   } catch (error) {
  //     console.error('❌ Erro ao criar board:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Atualizar board existente
   * Descomente e implemente quando backend estiver pronto
   */
  // static async updateBoard(boardId: string, boardData: UpdateBoardBody): Promise<Board> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(boardData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const updatedBoard = await response.json();
  //     console.log('✅ Board atualizado:', updatedBoard);
  //     return updatedBoard;
  //   } catch (error) {
  //     console.error('❌ Erro ao atualizar board:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Deletar board
   * Descomente e implemente quando backend estiver pronto
   */
  // static async deleteBoard(boardId: string): Promise<void> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     console.log('✅ Board deletado:', boardId);
  //   } catch (error) {
  //     console.error('❌ Erro ao deletar board:', error);
  //     throw error;
  //   }
  // }

  // ============================================
  // MÉTODOS PARA TASKS (FUTURO)
  // ============================================

  /**
   * 🚧 FUTURO: Criar nova task
   * Descomente e implemente quando backend estiver pronto
   */
  // static async createTask(taskData: CreateTaskBody): Promise<Task> {
  //   try {
  //     // Pode usar o boardId ativo do estado global ou passar como parâmetro
  //     const boardId = 'active-board-id'; // TODO: obter do estado global
  //     
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}/tasks`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(taskData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const newTask = await response.json();
  //     console.log('✅ Task criada:', newTask);
  //     return newTask;
  //   } catch (error) {
  //     console.error('❌ Erro ao criar task:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Atualizar task existente
   * Descomente e implemente quando backend estiver pronto
   */
  // static async updateTask(taskId: string, taskData: UpdateTaskBody): Promise<Task> {
  //   try {
  //     // Pode usar o boardId ativo do estado global ou passar como parâmetro
  //     const boardId = 'active-board-id'; // TODO: obter do estado global
  //     
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(taskData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const updatedTask = await response.json();
  //     console.log('✅ Task atualizada:', updatedTask);
  //     return updatedTask;
  //   } catch (error) {
  //     console.error('❌ Erro ao atualizar task:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Deletar task
   * Descomente e implemente quando backend estiver pronto
   */
  // static async deleteTask(taskId: string): Promise<void> {
  //   try {
  //     // Pode usar o boardId ativo do estado global ou passar como parâmetro
  //     const boardId = 'active-board-id'; // TODO: obter do estado global
  //     
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     console.log('✅ Task deletada:', taskId);
  //   } catch (error) {
  //     console.error('❌ Erro ao deletar task:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Mover task entre colunas
   * Descomente e implemente quando backend estiver pronto
   */
  // static async moveTask(
  //   boardId: string,
  //   taskId: string,
  //   newColumnId: string,
  //   newPosition: number
  // ): Promise<void> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}/tasks/${taskId}/move`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         newColumnId,
  //         newPosition,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     console.log('✅ Task movida:', taskId, 'para coluna:', newColumnId);
  //   } catch (error) {
  //     console.error('❌ Erro ao mover task:', error);
  //     throw error;
  //   }
  // }

  // ============================================
  // MÉTODOS PARA COLUNAS (FUTURO)
  // ============================================

  /**
   * 🚧 FUTURO: Criar nova coluna
   * Descomente e implemente quando backend estiver pronto
   */
  // static async createColumn(boardId: string, columnData: CreateColumnBody): Promise<Column> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}/columns`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(columnData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const newColumn = await response.json();
  //     console.log('✅ Coluna criada:', newColumn);
  //     return newColumn;
  //   } catch (error) {
  //     console.error('❌ Erro ao criar coluna:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Atualizar coluna existente
   * Descomente e implemente quando backend estiver pronto
   */
  // static async updateColumn(columnId: string, columnData: Partial<CreateColumnBody>): Promise<Column> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/columns/${columnId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(columnData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const updatedColumn = await response.json();
  //     console.log('✅ Coluna atualizada:', updatedColumn);
  //     return updatedColumn;
  //   } catch (error) {
  //     console.error('❌ Erro ao atualizar coluna:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Deletar coluna
   * Descomente e implemente quando backend estiver pronto
   */
  // static async deleteColumn(columnId: string): Promise<void> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/columns/${columnId}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     console.log('✅ Coluna deletada:', columnId);
  //   } catch (error) {
  //     console.error('❌ Erro ao deletar coluna:', error);
  //     throw error;
  //   }
  // }

  /**
   * 🚧 FUTURO: Reordenar colunas
   * Descomente e implemente quando backend estiver pronto
   */
  // static async reorderColumns(
  //   boardId: string,
  //   columnIds: string[]
  // ): Promise<void> {
  //   try {
  //     const response = await fetch(`${this.BASE_URL}/boards/${boardId}/columns/reorder`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ columnIds }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     console.log('✅ Colunas reordenadas:', columnIds);
  //   } catch (error) {
  //     console.error('❌ Erro ao reordenar colunas:', error);
  //     throw error;
  //   }
  // }
} 