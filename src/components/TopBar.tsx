import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// @ts-ignore
import "@fontsource/inter";
import { useEffect, useState } from "react";
import { palette } from "../themes/jsonTheme";
import { UserService } from "../services/userService";

export function TopBar() {
    const [userName, setUserName] = useState<string>("...");

    useEffect(() => {
        let cancelled = false;
        UserService.getCurrentUser()
            .then((user) => {
                if (!cancelled) {
                    setUserName(user.nome || "Usuário");
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar usuário:", error);
                if (!cancelled) {
                    setUserName("Usuário");
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: palette.background.default,
                    color: palette.primary[400],
                    fontFamily: "pacifico",
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontSize: "32px " }}
                    >
                        Posta ai
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <img
                            src="/src/assets/student_avatar.png"
                            alt="Avatar"
                            style={{
                                width: "50px",
                                height: "50px",
                                // borderRadius: "50%",
                                marginRight: "10px",
                            }}
                        />
                        <Typography
                            color="inherit"
                            sx={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "bold",
                            fontSize: "18px",
                        }}
                    >
                            {userName}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
        </Box>
    );
}
