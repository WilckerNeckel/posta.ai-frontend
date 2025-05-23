// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
// @ts-ignore
import "@fontsource/pacifico";

export const muiTheme = createTheme({
    typography: {
        fontFamily: '"pacifico", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
        },
        button: {
            textTransform: "none", // remove uppercase on buttons
        },
    },
    palette: {
        primary: {
            main: "#441B16",
        },
        secondary: {
            main: "#815743",
        },
        background: {
            default: "#E2D3CA",
        },

        customGrey: {
            darker: "#2E2E2E", // Replace with your desired color
            light: "#F5F5F5", // Replace with your desired color
        },
        lines: "#CCCCCC", // Add a default lines color
    },
});
