'use client';

import * as React from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { showSnackbar } from '@/app/redux/snack.slice';

import { Button, CardContent, Icon, Typography, Dialog, DialogContent, DialogActions, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import HoverableCard from '@/app/components/HoverableCard';

export default function NewProduct({fetchProducts}: any) {
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setName('');
		setCategory('');
		setDescription('');
	};

	const [name, setName] = useState('');

	const handleNameChange = (event: any) => {
		setName(event.target.value);
	};

	const [category, setCategory] = useState('');

	const handleCategoryChange = (event: any) => {
		setCategory(event.target.value);
	};

	const [description, setDescription] = useState('');

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const handleSubmit = () => {
		if(name.trim() === '') {
			dispatch(showSnackbar({ message: 'Debe establecer un nombre del producto', type: 'warning', duration: 3000 }));
			return;
		}

		if(category.trim() === '') {
			dispatch(showSnackbar({ message: 'Debe especificar un categoría del producto', type: 'warning', duration: 3000 }));
			return;
		}

		fetch('/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, category, description }),
		})
			.then(response => {
				if (response.ok) {
					// Handle success response
					fetchProducts();
					dispatch(showSnackbar({ message: 'Producto añadido satisfactoriamente', type: 'success', duration: 3000 }));
					handleClose();
				} else {
					// Handle error response
					throw new Error();
				}
			})
			.catch(error => {
				// Handle fetch error
				dispatch(showSnackbar({ message: 'Ocurrió un error al añadir el producto', type: 'error', duration: 3000 }));
			});
	};

	return (
		<>
			<HoverableCard style={{ height: '100%' }}>
				<Button style={{ height: '100%', width: '100%' }} onClick={handleClickOpen}>
					<CardContent>
						<Icon>add</Icon>
						<Typography>
							Crear producto
						</Typography>
					</CardContent>
				</Button>
			</HoverableCard>
			<Dialog
				maxWidth={'md'}
				fullWidth={true}
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<Grid sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
						<Typography variant='h4'>Nuevo Producto</Typography>
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
					<Button variant="contained" color='success' onClick={handleSubmit} autoFocus>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}