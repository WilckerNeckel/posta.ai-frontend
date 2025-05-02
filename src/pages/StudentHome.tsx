import { Box, Stack } from "@mui/material";
import SideDrawer from "../components/SideDrawer";
import { styled } from "@mui/material/styles";
import { ActiveBoardPage } from "./ActiveBoardPage";

const MainContainer = styled(Box)(() => ({
    flexGrow: 1,
    backgroundColor: "transparent"
}));

export const StudentHome = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(/src/assets/student_background.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
                display: "flex",
            }}
        >
            <SideDrawer>
                <Stack overflow="hidden">
                    <Box
                        display="flex"
                        overflow="hidden"
                    >
                        <MainContainer
                            zIndex={2}
                            width="100%"
                            overflow="auto"
                            component="main"
                            height={{
                                xs: "92vh",
                                md: "90vh",
                            }}
                        >
                            <ActiveBoardPage />
                        </MainContainer>
                    </Box>
                </Stack>
            </SideDrawer>
        </Box>
    );
};
