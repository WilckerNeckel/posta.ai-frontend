import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { store } from "./redux/store/store.ts";
import { ThemeContextProvider } from "./config/theme/ThemeContextProvider";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeContextProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeContextProvider>
    </StrictMode>
);
