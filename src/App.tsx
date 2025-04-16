import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StudentHome } from "./pages/StudentHome";
import { CssBaseline } from "@mui/material";

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StudentHome />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
