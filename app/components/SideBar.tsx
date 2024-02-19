'use client';

import * as React from 'react';
import { AppBar, Toolbar, IconButton, Box, SwipeableDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, ImageListItem, Divider, Tooltip } from "@mui/material";
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import ShoppingCart from './ShoppingCart';

export default function SideBar() {
	const [state, setState] = React.useState({
		open: false,
	});

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setState({ ...state, ['open']: open });
	};

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<Tooltip title="Menú">
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={toggleDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
						</Tooltip>
					</Box>

					<ShoppingCart />
				</Toolbar>
			</AppBar>

			<SwipeableDrawer
				anchor='left'
				open={state['open']}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer(false)}
					onKeyDown={toggleDrawer(false)}
				>
					<ImageListItem>
						<Image src="/images/restaurant.jpg" width={250} height={200} alt={'pizza'}></Image>
					</ImageListItem>
					<List>
						<ListItem key="Menú" disablePadding>
							<Box width='100%'>
								<Link href="/">
									<ListItemButton>
										<ListItemIcon>
											<Icon>assignment</Icon>
										</ListItemIcon>
										<ListItemText primary="Menú" />
									</ListItemButton>
								</Link>
							</Box>
						</ListItem>
						<Divider />
						<ListItem key="Administrar" disablePadding>
							<Box width='100%'>
								<Link href="/admin/menus">
									<ListItemButton>
										<ListItemIcon>
											<Icon>restaurant_menu</Icon>
										</ListItemIcon>
										<ListItemText primary="Administrar" />
									</ListItemButton>
								</Link>
							</Box>
						</ListItem>
						<Divider />
						<ListItem key="Productos" disablePadding>
							<Box width='100%'>
								<Link href="/admin/products">
									<ListItemButton>
										<ListItemIcon>
											<Icon>room_service</Icon>
										</ListItemIcon>
										<ListItemText primary="Productos" />
									</ListItemButton>
								</Link>
							</Box>
						</ListItem>
						<Divider />
					</List>
				</Box>
			</SwipeableDrawer>
		</>
	)
}