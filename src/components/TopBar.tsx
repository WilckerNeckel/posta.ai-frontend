import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
                    <Button
                        color="inherit"
                        sx={{
                            fontFamily: "inter",
                            fontWeight: "bold",
                            fontSize: "18px "

                        }}
                    >
                        Wicker Neckel
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
