import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#40c9c9",
			dark: "#45a29e",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#b30404",
			dark: "#ff0000",
			light: "#ff0000",
		},
		text: {
			primary: "#c1c1c1",
			secondary: "#9a9a9a",
			disabled: "#7d7d7d",
		},
		background: {
			default: "#0b0c10",
			paper: "#1f2833",
		},
		divider: "rgba(183,183,183,0.2)",
	},
});

export const lightTheme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#0097a7",
			dark: "#006978",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#d32f2f",
			dark: "#9a0007",
			light: "#ff6659",
		},
		text: {
			primary: "#212121",
			secondary: "#616161",
			disabled: "#9e9e9e",
		},
		background: {
			default: "#fafafa",
			paper: "#ffffff",
		},
		divider: "rgba(0, 0, 0, 0.12)",
	},
});
