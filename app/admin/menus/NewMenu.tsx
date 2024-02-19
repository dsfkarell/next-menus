import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

import { Button, Card, CardContent, Icon, Typography, Dialog, DialogContent, DialogActions, TextField } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import ProductInNewMenu from './ProductInNewMenu';
import ProductsSelector from './ProductsSelector';
import HoverableCard from '@/app/components/HoverableCard';

export default function NewMenu({ fetchMenus }: any) {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
	};

	const [description, setDescription] = useState('');

	const handleDescriptionChange = (event: any) => {
		setDescription(event.target.value);
	};

	const [products, setProducts]: any = useState([]);

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
		setTitle('');
		setDescription('');
		setProducts([]);
	};

	const handleCreate = () => {
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

		fetch('/api/menus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, description, products }),
		})
			.then(response => {
				if (response.ok) {
					// Handle success response
					fetchMenus();
					dispatch(showSnackbar({ message: 'Menú creado satisfactoriamente', type: 'success', duration: 3000 }));
					handleClose();
				} else {
					// Handle error response
					throw new Error();
				}
			})
			.catch(() => {
				// Handle fetch error
				dispatch(showSnackbar({ message: 'Ocurrió un error al crear el menú', type: 'error', duration: 3000 }));
			});
	};

	return (
		<>
			<HoverableCard style={{ height: '100%' }}>
				<Button style={{ height: '100%', width: '100%' }} onClick={handleClickOpen}>
					<CardContent>
						<Icon>add</Icon>
						<Typography>
							Crear menú
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
						<Typography variant='h4'>Nuevo Menú</Typography>
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
						<ProductsSelector handleAddProduct={handleAddProduct} />
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button variant="contained" color='success' onClick={handleCreate} autoFocus>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}