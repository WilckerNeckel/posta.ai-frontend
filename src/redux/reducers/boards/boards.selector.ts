// ============================================
// BOARDS SELECTORS COM ESTADOS DE LOADING
// ============================================
// 
// 🔄 MUDANÇA: Adicionados seletores para loading/error
// ✅ EXISTENTES: Seletores originais mantidos
// 🆕 NOVOS: Seletores para controle de carregamento
// 🚧 FUTURO: Seletores comentados para funcionalidades avançadas

import { RootState } from "../../store/store";

// ============================================
// SELETORES EXISTENTES (MANTIDOS)
// ============================================

export const selectTotalBoards = (state: RootState) =>
  state.boards.boards.length;

export const selectBoards = (state: RootState) => state.boards.boards;

export const selectActiveBoard = (state: RootState) => state.boards.activeBoard;

export const selectActiveTask = (state: RootState) => state.boards.activeTask;

export const selectActiveBoardColumns = (state: RootState) =>
  state.boards.activeBoard?.columns.map((column) => ({
    key: column.id,
    value: column.name,
  })) || [];

export const selectFilteredTasks = (state: RootState) => state.boards.filteredTasks;

export const selectIsFiltered = (state: RootState) => state.boards.isFiltered;

// ============================================
// NOVOS SELETORES - ESTADOS DE CARREGAMENTO
// ============================================

/**
 * ✅ FUNCIONAL: Seleciona se está carregando boards
 * Usado para mostrar loading spinners na UI
 */
export const selectBoardsLoading = (state: RootState) => state.boards.loading;

/**
 * ✅ FUNCIONAL: Seleciona erro de carregamento
 * Usado para mostrar mensagens de erro na UI
 */
export const selectBoardsError = (state: RootState) => state.boards.error;

/**
 * ✅ FUNCIONAL: Seleciona se há dados carregados
 * Útil para saber se já foi feito o carregamento inicial
 */
export const selectHasBoardsData = (state: RootState) => 
  state.boards.boards.length > 0;

/**
 * ✅ FUNCIONAL: Seleciona se app está pronto para uso
 * Combina loading e presença de dados
 */
export const selectAppReady = (state: RootState) => 
  !state.boards.loading && state.boards.boards.length > 0;

/**
 * ✅ FUNCIONAL: Seleciona se precisa carregar dados
 * Útil para componentes que precisam decidir se devem carregar
 */
export const selectNeedsDataLoad = (state: RootState) => 
  !state.boards.loading && state.boards.boards.length === 0 && !state.boards.error;

// ============================================
// SELETORES COMPOSTOS (ÚTEIS)
// ============================================

/**
 * ✅ FUNCIONAL: Seleciona informações do board ativo
 * Combina dados úteis em um objeto só
 */
export const selectActiveBoardInfo = (state: RootState) => {
  const activeBoard = state.boards.activeBoard;
  
  if (!activeBoard) return null;
  
  return {
    id: activeBoard.id,
    name: activeBoard.name,
    columnsCount: activeBoard.columns.length,
    totalTasks: activeBoard.columns.reduce((total, col) => total + col.tasks.length, 0),
    hasColumns: activeBoard.columns.length > 0,
  };
};

/**
 * ✅ FUNCIONAL: Seleciona estatísticas das tasks
 * Útil para dashboards ou métricas
 */
export const selectTasksStats = (state: RootState) => {
  const activeBoard = state.boards.activeBoard;
  
  if (!activeBoard) return null;
  
  const allTasks = activeBoard.columns.flatMap(col => col.tasks);
  
  const tasksWithSubtasks = allTasks.filter(task => task.subtasks.length > 0);
  
  const completedSubtasks = allTasks.reduce((acc, task) => 
    acc + task.subtasks.filter(subtask => subtask.isCompleted).length, 0
  );
  
  const totalSubtasks = allTasks.reduce((acc, task) => acc + task.subtasks.length, 0);
  
  return {
    totalTasks: allTasks.length,
    tasksWithSubtasks: tasksWithSubtasks.length,
    completedSubtasks,
    totalSubtasks,
    subtaskCompletionRate: totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0,
  };
};

// ============================================
// SELETORES FUTUROS (COMENTADOS)
// ============================================

/**
 * 🚧 FUTURO: Seleciona se operação está em progresso
 * Descomente quando tiver operações de persistência
 */
// export const selectOperationInProgress = (state: RootState) => 
//   state.boards.loading || state.boards.saving || state.boards.deleting;

/**
 * 🚧 FUTURO: Seleciona últimas operações realizadas
 * Útil para mostrar histórico ou desfazer ações
 */
// export const selectRecentOperations = (state: RootState) => 
//   state.boards.recentOperations || [];

/**
 * 🚧 FUTURO: Seleciona se há mudanças pendentes
 * Para indicar quando há alterações não salvas
 */
// export const selectHasPendingChanges = (state: RootState) => 
//   state.boards.pendingChanges && state.boards.pendingChanges.length > 0;

/**
 * 🚧 FUTURO: Seleciona dados de sincronização
 * Para mostrar status de sync com backend
 */
// export const selectSyncStatus = (state: RootState) => ({
//   lastSyncAt: state.boards.lastSyncAt,
//   isSyncing: state.boards.isSyncing,
//   syncError: state.boards.syncError,
//   pendingSync: state.boards.pendingSync,
// });

/**
 * 🚧 FUTURO: Seleciona permissões do usuário
 * Quando tiver autenticação e controle de acesso
 */
// export const selectUserPermissions = (state: RootState) => ({
//   canCreateBoard: state.boards.userPermissions?.canCreate || false,
//   canEditBoard: state.boards.userPermissions?.canEdit || false,
//   canDeleteBoard: state.boards.userPermissions?.canDelete || false,
//   canManageTasks: state.boards.userPermissions?.canManageTasks || false,
// });
