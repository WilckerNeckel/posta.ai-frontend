import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StudentHome } from "./pages/StudentHome";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { muiTheme } from "./themes/muiTheme";
import { LoginPage } from "./pages/LoginPage";

function App() {
    return (
        <>
            <CssBaseline />

            <ThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/board" element={<StudentHome />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
