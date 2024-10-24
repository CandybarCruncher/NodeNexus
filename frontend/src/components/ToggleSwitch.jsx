import React from "react";
import { Switch, FormControlLabel } from "@mui/material";

function ToggleSwitch({ isDarkMode, toggleTheme }) {
	return (
		<FormControlLabel
			control={
				<Switch
					checked={isDarkMode}
					onChange={toggleTheme}
					color="default"
				/>
			}
			label={isDarkMode ? "Dark Mode" : "Light Mode"}
		/>
	);
}

export default ToggleSwitch;
