import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from '@/app/redux/snack.slice';

import { Badge, Box, Button, Divider, Icon, IconButton, ListItem, ListItemText, Menu, MenuItem, MenuList, Tooltip, Typography } from "@mui/material";
import { removeFromCart } from '@/app/redux/cart.slice';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function ShoppingCart() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event: any) => {
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}

	const cart = useSelector((state: any) => state.cart);
	const dispatch = useDispatch();

	const getTotalPrice = () => {
		var value = cart.reduce(
			(accumulator: any, item: any) => accumulator + item.quantity * item.price,
			0
		);

		return parseFloat(value).toFixed(2);
	};

	const handlePay = () => {
		dispatch(showSnackbar({ message: 'Funcionalidad no implementada', type: 'warning', duration: 3000 }));
	}

	return (
		<>
			<Box>
				<Tooltip title="Carrito de compras">
					<IconButton color="inherit" onClick={handleOpen}>
						<Badge badgeContent={cart.length} color="warning">
							<Icon>shopping_cart</Icon>
						</Badge>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<MenuList dense>
					{cart.length === 0 && (
						<MenuItem disabled>
							<ListItemText>
								<Typography noWrap>
									No posee productos en su carrito
								</Typography>
							</ListItemText>
						</MenuItem>
					)}
					{cart.length !== 0 && cart.map((item: any, index: any) => (
						<MenuItem key={item.id}>
							<ListItem>
								<Grid xs={12} container alignItems="center">
									<Grid xs={8} display="flex" justifyContent="start">
										<Typography noWrap>
											{item.product} {item.quantity > 1 && (<span> (x{item.quantity})</span>)}
										</Typography>
									</Grid>
									<Grid xs={3} display="flex" justifyContent="center">
										<Typography>
											$ {item.price}
										</Typography>
									</Grid>
									<Grid xs={1} display="flex" justifyContent="rigth">
										<Tooltip title="Quitar del carrito">
											<IconButton onClick={() => dispatch(removeFromCart(item.id))}>
												<Icon color="error">delete</Icon>
											</IconButton>
										</Tooltip>
									</Grid>
								</Grid>
							</ListItem>
						</MenuItem>
					))}
					{cart.length !== 0 && (
						<Grid container>
							<Divider />
							<ListItem>
								<Grid xs={12} display="flex" justifyContent="center">
									<Typography>
										<b>Precio total:</b> $ {getTotalPrice()}
									</Typography>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid xs={12} display="flex" justifyContent="center">
									<Button disabled={cart.length === 0} variant="contained" color="success" onClick={handlePay}>Ordenar y Pagar</Button>
								</Grid>
							</ListItem>
						</Grid>
					)}
				</MenuList>
			</Menu>
		</>
	);
}