import "./App.css";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../theme.js";
import { router } from "../routes.jsx";
import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function App() {
	const [isDarkMode, setIsDarkMode] = useState(
		() => JSON.parse(localStorage.getItem("isDarkMode")) || true
	);

	const currentTheme = useMemo(
		() => (isDarkMode ? darkTheme : lightTheme),
		[isDarkMode]
	);

	const toggleTheme = () =>
		setIsDarkMode((prev) => {
			const newMode = !prev;
			localStorage.setItem("isDarkMode", JSON.stringify(newMode));
			return newMode;
		});

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			<ThemeProvider theme={currentTheme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export default App;
