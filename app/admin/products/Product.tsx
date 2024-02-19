'use client';

import React, { useState } from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Icon, TextField, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

export default function Product({ product, fetchProducts }: any) {
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

	const handleClickOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	};

	const [name, setName] = useState(product.name);

	const handleNameChange = (event: any) => {
		setName(event.target.value);
	};

	const [category, setCategory] = useState(product.category);

	const handleCategoryChange = (event: any) => {
		setCategory(event.target.value);
	};

	const [description, setDescription] = useState(product.description);

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const handleUpdate = () => {
		if(name.trim() === '') {
			dispatch(showSnackbar({ message: 'Debe establecer un nombre del producto', type: 'warning', duration: 3000 }));
			return;
		}

		if(category.trim() === '') {
			dispatch(showSnackbar({ message: 'Debe especificar un categoría del producto', type: 'warning', duration: 3000 }));
			return;
		}
		
		fetch(`/api/products/${product.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, category, description }),
		})
			.then(response => {
				if (response.ok) {
					// Handle success response
					fetchProducts();
					dispatch(showSnackbar({ message: 'Producto actualizado satisfactoriamente', type: 'success', duration: 3000 }));
				} else {
					// Handle error response
					throw new Error();
				}
				handleClose();
			})
			.catch(error => {
				// Handle fetch error
				handleClose();
				dispatch(showSnackbar({ message: 'Ocurrió un error al actualizar producto', type: 'error', duration: 3000 }));
			});
	};

	const handleDeleteProduct = () => {
		handleCloseDeleteDialog();

		fetch(`/api/products/${product.id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.ok) {
					// Handle success response
					fetchProducts();
					dispatch(showSnackbar({ message: 'Producto eliminado satisfactoriamente', type: 'success', duration: 3000 }));
				} else {
					// Handle error response
					throw new Error();
				}
			})
			.catch(error => {
				// Handle fetch error
				dispatch(showSnackbar({ message: 'Ocurrió un error mientras se eliminaba el producto', type: 'error', duration: 3000 }));
			});
	};

	return (
		<>
			<Card>
				<CardMedia
					component="img"
					height="194"
					image="/images/comida.jpg"
					alt={product.name}
				/>
				<CardContent>
					<Grid container>
						<Grid xs={12} textAlign="center">
							<Typography variant="h5" noWrap>
								{product.name}
							</Typography>
						</Grid>
						<Grid xs={12} textAlign="center">
							<Typography noWrap>
								{product.category}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions>
					<Grid container minHeight={50} width='100%'>
						<Grid xs display="flex" justifyContent="center" alignItems="center">
							<Tooltip title="Editar">
								<Fab size="small" color='info' onClick={handleClickOpen}>
									<Icon>edit</Icon>
								</Fab>
							</Tooltip>
						</Grid>
						<Grid xs display="flex" justifyContent="center" alignItems="center">
							<Tooltip title="Eliminar">
								<Fab size="small" color='error' onClick={handleClickOpenDeleteDialog}>
									<Icon>delete</Icon>
								</Fab>
							</Tooltip>
						</Grid>
					</Grid>
				</CardActions>
			</Card>

			<Dialog
				maxWidth={'md'}
				fullWidth={true}
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<Grid sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
						<Typography variant='h4'>Editar Producto</Typography>
					</Grid>
					<Grid>
						<TextField
							id="name"
							label="Nombre*"
							variant="standard"
							fullWidth
							value={name}
							onChange={handleNameChange} />
					</Grid>
					<Grid mt={3}>
						<TextField
							id="category"
							label="Categoría*"
							multiline
							variant="standard"
							fullWidth
							value={category}
							onChange={handleCategoryChange}
						/>
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button variant="contained" color='success' onClick={handleUpdate} autoFocus>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={openDeleteDialog}
				keepMounted
				onClose={handleCloseDeleteDialog}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>
					<Icon color="error">delete</Icon>
					{' '} Eliminar
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						¿Está seguro que desea eliminar este producto?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
					<Button variant="contained" color="error" onClick={handleDeleteProduct}>Eliminar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}