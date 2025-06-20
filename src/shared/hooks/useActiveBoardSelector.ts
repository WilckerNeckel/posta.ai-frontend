import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadBoardsFromAPI, setActiveBoard } from "../../redux/reducers/boards/boards.reducer";
import {
  selectBoards,
  selectActiveBoard,
  selectBoardsLoading,
  selectBoardsError,
  selectNeedsDataLoad,
  selectAppReady,
} from "../../redux/reducers/boards/boards.selector";
import { useAppDispatch } from "../../redux/store/store";

// ============================================
// INTERFACE DO HOOK (AMPLIADA)
// ============================================

interface UseActiveBoardSelectorReturn {
  // Dados principais (mantidos para compatibilidade)
  activeBoard: ReturnType<typeof selectActiveBoard>;
  boards: ReturnType<typeof selectBoards>;
  
  // 🆕 Estados de carregamento
  loading: boolean;
  error: string | null;
  appReady: boolean;
  
  // 🆕 Funções utilitárias
  reloadData: () => void;
  
  // 🚧 FUTURO: Funções comentadas para implementação
  // refreshData: () => void;
  // clearError: () => void;
}

// ============================================
// HOOK PRINCIPAL
// ============================================

export const useActiveBoardSelector = (): UseActiveBoardSelectorReturn => {
  const dispatch = useAppDispatch();
  
  // ============================================
  // SELETORES DE DADOS
  // ============================================
  
  const boards = useSelector(selectBoards);
  const activeBoard = useSelector(selectActiveBoard);
  
  // ============================================
  // SELETORES DE ESTADO
  // ============================================
  
  const loading = useSelector(selectBoardsLoading);
  const error = useSelector(selectBoardsError);
  const needsDataLoad = useSelector(selectNeedsDataLoad);
  const appReady = useSelector(selectAppReady);

  // ============================================
  // CARREGAMENTO INICIAL DOS DADOS
  // ============================================
  
  useEffect(() => {
    // ✅ Carrega dados apenas se necessário
    if (needsDataLoad) {
      console.log('🚀 useActiveBoardSelector: Iniciando carregamento de dados...');
      dispatch(loadBoardsFromAPI());
    }
  }, [needsDataLoad, dispatch]);

  // ============================================
  // AUTO-SELEÇÃO DO PRIMEIRO BOARD
  // ============================================
  
  useEffect(() => {
    // ✅ Seleciona primeiro board se não houver ativo
    // (Isso já é feito no reducer, mas mantemos como fallback)
    if (boards.length > 0 && !activeBoard && !loading) {
      console.log('🎯 useActiveBoardSelector: Auto-selecionando primeiro board:', boards[0].name);
      dispatch(setActiveBoard(boards[0]));
    }
  }, [boards, activeBoard, loading, dispatch]);

  // ============================================
  // FUNÇÕES UTILITÁRIAS
  // ============================================
  
  /**
   * ✅ FUNCIONAL: Recarrega dados da API
   * Força novo carregamento mesmo se já houver dados
   */
  const reloadData = () => {
    console.log('🔄 useActiveBoardSelector: Recarregando dados...');
    dispatch(loadBoardsFromAPI());
  };

  // ============================================
  // FUNÇÕES FUTURAS (COMENTADAS)
  // ============================================
  
  /**
   * 🚧 FUTURO: Refresh inteligente de dados
   * Descomente quando implementar cache/timestamp
   */
  // const refreshData = () => {
  //   // Apenas recarrega se dados estiverem "antigos"
  //   const lastLoadTime = useSelector(selectLastLoadTime);
  //   const now = Date.now();
  //   const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  //   
  //   if (!lastLoadTime || (now - lastLoadTime) > CACHE_DURATION) {
  //     console.log('🔄 useActiveBoardSelector: Refresh de dados necessário');
  //     dispatch(loadBoardsFromAPI());
  //   } else {
  //     console.log('✅ useActiveBoardSelector: Dados ainda válidos no cache');
  //   }
  // };

  /**
   * 🚧 FUTURO: Limpar erro manualmente
   * Descomente quando implementar controle de erro mais granular
   */
  // const clearError = () => {
  //   dispatch(clearBoardsError());
  // };

  // ============================================
  // LOGS DE DEBUG (DESENVOLVIMENTO)
  // ============================================
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 useActiveBoardSelector - Estado atual:', {
        boards: boards.length,
        activeBoard: activeBoard?.name || 'nenhum',
        loading,
        error,
        appReady,
        needsDataLoad,
      });
    }
  }, [boards.length, activeBoard?.name, loading, error, appReady, needsDataLoad]);

  // ============================================
  // RETORNO DO HOOK
  // ============================================
  
  return { 
    // Dados principais (compatibilidade mantida)
    activeBoard, 
    boards,
    
    // Estados de carregamento
    loading,
    error,
    appReady,
    
    // Funções utilitárias
    reloadData,
    
    // 🚧 FUTURO: Descomente quando implementar
    // refreshData,
    // clearError,
  };
};
