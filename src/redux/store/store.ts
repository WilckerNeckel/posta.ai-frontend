// ============================================
// STORE SEM PERSISTÊNCIA (DADOS VÊM DA API)
// ============================================
// 
// 🔄 MUDANÇA: Removido redux-persist
// ❌ ANTES: Dados salvos no localStorage
// ✅ AGORA: Dados carregados da API mock
// 
// 🚧 FUTURO: Se quiser reativar persistência:
// 1. Descomente as linhas do redux-persist abaixo
// 2. Use persistedReducer ao invés de reducer

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
import { boardsReducer } from "../reducers/boards/boards.reducer";
import { uiReducer } from "../reducers/ui/ui.reducer";

// ============================================
// CONFIGURAÇÃO ATUAL: SEM PERSISTÊNCIA
// ============================================

const reducer = combineReducers({
  ui: uiReducer.reducer,
  boards: boardsReducer.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Remove warnings sobre actions não serializáveis
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// ============================================
// CONFIGURAÇÃO COMENTADA: COM PERSISTÊNCIA
// ============================================
// 
// 🚧 FUTURO: Descomente para reativar persistência
// 
// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,
// };
// 
// const persistedReducer = persistReducer(persistConfig, reducer);
// 
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
//       },
//     }),
// });

// ============================================
// TYPES E HOOKS (MANTIDOS IGUAIS)
// ============================================

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
