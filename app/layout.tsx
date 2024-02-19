'use client';

import "./globals.css";

import { Provider } from 'react-redux';
import store from './redux/store';

import { Box } from "@mui/material";
import SideBar from "./components/SideBar";
import MySnackbar from "./components/MySnackbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
			<head>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			</head>
			<body suppressHydrationWarning={true}>
				<Provider store={store}>
					<SideBar />
					<Box m={3}>
						{children}
					</Box>

					<MySnackbar />
				</Provider>
			</body>
		</html>
	);
}
