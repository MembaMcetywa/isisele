import { createTheme } from "@mantine/core";

import "@mantine/core/styles.css";

export const theme = createTheme({
	components: {
		TextInput: {
			defaultProps: {
			
			},
		},
		NumberInput: {
			defaultProps: {
				radius: "xl",
			},
		},
		PasswordInput: {
			defaultProps: {
				radius: "xl",
			},
		},
		Button: {
			defaultProps: {
				
			},
		},
	},
});
