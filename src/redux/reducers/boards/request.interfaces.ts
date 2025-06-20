export interface CreateBoardBody {
  name: string;
  columns: string[];
}

export interface UpdateBoardBody {
  id: string;
  name: string;
  columns: {
    columnId?: string;
    columnName: string;
  }[];
}

// ============================================
// ✅ NOVA INTERFACE: CRIAR COLUNA
// ============================================

/**
 * 🚧 FUTURO: Interface para criar coluna via API
 * Preparada para quando backend estiver pronto
 */
export interface CreateColumnBody {
  name: string;
  boardId?: string; // Opcional, pode usar activeBoard do estado
}

export interface CreateTaskBody {
  title: string;
  columnId: string;
  subtasks: string[];
  description?: string;
}

export interface UpdateTaskBody {
  id: string;
  title: string;
  columnId: string;
  description?: string;
  subtasks: {
    id?: string;
    title: string;
    isCompleted: boolean;
  }[];
}
