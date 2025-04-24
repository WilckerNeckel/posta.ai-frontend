import { Box, Typography } from "@mui/material";
import SideDrawer from "../components/SideDrawer";

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
            <SideDrawer>

            </SideDrawer>
            {/* <TopBar /> */}
        </Box>
    );
};
