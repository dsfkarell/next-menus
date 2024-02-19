'use client';

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

import { Button, Icon, Typography, Dialog, DialogContent, DialogActions, TextField, Fab, Tooltip } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import ProductInNewMenu from './ProductInNewMenu';
import AddProductInMenu from './ProductsSelector';

export default function EditMenu({ menu, fetchMenus }: any) {
	const dispatch = useDispatch();

	const [title, setTitle] = useState(menu.title);

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const [description, setDescription] = useState(menu.description);

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const [products, setProducts]: any = useState(menu.products);

	const handleAddProduct = (product: any) => {
		setProducts([
			...products,
			product
		]);
	};

	const handlePriceChange = (productId: any, newPrice: any) => {
		setProducts((prevProducts: any) => {
			return prevProducts.map((product: any) => {
				if (product.id === productId) {
					return { ...product, price: newPrice };
				}
				return product;
			});
		});
	};

	const handleRemoveProduct = (productId: any) => {
		setProducts(
			products.filter((p: any) => p.id !== productId)
		);
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdate = () => {
		if(title.trim() === '') {
			dispatch(showSnackbar({ message: 'Debe establecer un nombre al menú', type: 'warning', duration: 3000 }));
			return;
		}

		if(products.length === 0) {
			dispatch(showSnackbar({ message: 'Debe agregar al menos un producto al menú', type: 'warning', duration: 3000 }));
			return;
		}

		if(products.some((product:any) => {return String(product.price).trim() === '' || product.price <= 0})) {
			dispatch(showSnackbar({ message: 'Debe establecer un precio válido a todos los productos', type: 'warning', duration: 3000 }));
			return;
		}
		
		fetch(`/api/menus/${menu.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, description, products }),
		})
			.then(response => {
				if (response.ok) {
					// Handle success response
					fetchMenus();
					dispatch(showSnackbar({ message: 'Menú editado satisfactoriamente', type: 'success', duration: 3000 }));
				} else {
					// Handle error response
					throw new Error();
				}
				handleClose();
			})
			.catch(() => {
				// Handle fetch error
				handleClose();
				dispatch(showSnackbar({ message: 'Ocurrió un error al editar el menú', type: 'error', duration: 3000 }));
			});
	};

	return (
		<>
			<Tooltip title="Editar">
				<Fab size="small" color='info' onClick={handleClickOpen}>
					<Icon>edit</Icon>
				</Fab>
			</Tooltip>
			<Dialog
				maxWidth={'md'}
				fullWidth={true}
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<Grid sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
						<Typography variant='h4'>Editar Menú</Typography>
					</Grid>
					<Grid>
						<TextField
							id="name"
							label="Nombre*"
							variant="standard"
							fullWidth
							value={title}
							onChange={handleTitleChange} />
					</Grid>
					<Grid mt={3}>
						<TextField
							id="description"
							label="Descripción"
							multiline
							variant="standard"
							fullWidth
							value={description}
							onChange={handleDescriptionChange}
						/>
					</Grid>
					<Grid sx={{ textAlign: { xs: 'center', sm: 'start' } }} mt={3}>
						<Typography variant='h5'>Productos</Typography>
						{products.map((product: any, index: number) => (
							<ProductInNewMenu product={product} handlePriceChange={handlePriceChange} handleRemoveProduct={handleRemoveProduct} key={index} />
						))}
					</Grid>
					<Grid mt={3}>
						<AddProductInMenu handleAddProduct={handleAddProduct} />
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button variant="contained" color='success' onClick={handleUpdate} autoFocus>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}