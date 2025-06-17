import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { palette } from "../themes/jsonTheme";
import { Checkbox } from "@mui/material";
import { useAppDispatch } from "../redux/store/store";
import {
    filterTasks,
    clearFilter,
} from "../redux/reducers/boards/boards.reducer";
import { useSelector } from "react-redux";
import {
    selectFilteredTasks,
    selectIsFiltered,
} from "../redux/reducers/boards/boards.selector";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

type DrawerLayoutProps = {
    children: React.ReactNode;
};

export default function SideDrawer({ children }: DrawerLayoutProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useAppDispatch();
    const filteredTasks = useSelector(selectFilteredTasks);
    const isFiltered = useSelector(selectIsFiltered);

    const onFilter = (checked: boolean, title: string) => {
        if (checked) {
            // Add filter to active filters
            const newFilters = [...activeFilters, title];
            setActiveFilters(newFilters);

            // Apply filtering - search for tasks that match any of the active filters as complete phrases
            const searchTerm = newFilters.join("|");
            dispatch(filterTasks(searchTerm));

            console.log(`${title} selected`);
        } else {
            // Remove filter from active filters
            const newFilters = activeFilters.filter(
                (filter) => filter !== title
            );
            setActiveFilters(newFilters);

            if (newFilters.length === 0) {
                // No filters active, clear filtering
                dispatch(clearFilter());
            } else {
                // Apply remaining filters
                const searchTerm = newFilters.join("|");
                dispatch(filterTasks(searchTerm));
            }

            console.log(`${title} deselected`);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    backgroundColor: palette.bar.default,
                    color: palette.primary[400],
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: "none" },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        Posta ai
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
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
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: palette.bar.default,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Divider />
                <List>
                    {[
                        "Laboratório de redes",
                        "Banco de dados",
                        "Matemática discreta",
                    ].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={(event) => {
                                            onFilter(
                                                event.target.checked,
                                                text
                                            );
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}
