import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudentHome } from "./pages/StudentHome";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { muiTheme } from "./themes/muiTheme";

function App() {
    return (
        <>
            <CssBaseline />

            <ThemeProvider theme={muiTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<StudentHome />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
