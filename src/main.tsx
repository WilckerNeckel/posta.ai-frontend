import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./redux/store/store.ts";
import { persistStore } from "redux-persist";
import { ThemeContextProvider } from "./config/theme/ThemeContextProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";




const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeContextProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ThemeContextProvider>
    </StrictMode>
);
