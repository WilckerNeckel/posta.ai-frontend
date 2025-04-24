import { Box } from "@mui/material";
import { TopBar } from "../components/TopBar";

export const StudentHome = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(/src/assets/student_background.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
            }}
        >
            <TopBar />
        </Box>
    );
};
