import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// @ts-ignore
import "@fontsource/inter";
import { palette } from "../themes/jsonTheme";

export function TopBar() {
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
                            Wicker Neckel
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
