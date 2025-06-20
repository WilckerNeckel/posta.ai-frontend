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
  // static async createTask(boardId: string, taskData: CreateTaskBody): Promise<Task> {
  //   try {
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
  // static async updateTask(boardId: string, taskId: string, taskData: UpdateTaskBody): Promise<Task> {
  //   try {
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
  // static async deleteTask(boardId: string, taskId: string): Promise<void> {
  //   try {
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
} 