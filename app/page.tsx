'use client';

import { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';
import { addToCart } from './redux/cart.slice';

import { Checkbox, CircularProgress, Container, Fab, Icon, Tooltip, Typography, Zoom } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import Banner from "./components/Banner";

const getActiveMenu = async () => {
	const res = await fetch('/api/menus/active');
	const data = await res.json();
	return data;
};

const formatJSONProductsData = (productsJsonData: any[]) => {
	const formattedData: any[] = [];

	productsJsonData.forEach((item: any) => {
		const existingCategory = formattedData.find((category: any) => category.category.toLowerCase() === item.category.toLowerCase());

		item.checked = false;
		if (!existingCategory) {
			formattedData.push({
				category: item.category,
				products: [item]
			});
		} else {
			existingCategory.products.push(item);
		}
	});

	return formattedData;
}

export default function Home() {

	const [isLoading, setLoading]: any = useState(true);

	const [activeMenu, setActiveMenu]: any = useState({ products: [], selectedProducts: [] });

	async function fetchData() {
		var menu = await getActiveMenu();
		menu.products = await formatJSONProductsData(menu.products);
		menu.selectedProducts = [];
		setActiveMenu(menu);

		return menu;
	}

	useEffect(() => {
		fetchData()
			.then((response: any) => {
				if (response) {
					// Handle success response
				} else {
					// Handle error response
					throw new Error();
				}
			})
			.catch(error => {
				// Handle fetch error
				dispatch(showSnackbar({ message: 'Ocurrió un error al obtener los productos del menú', type: 'error', duration: 3000 }));
			}).finally(() => {
				setLoading(false);
			});
	}, []);

	const handleSelectProduct = (product: any) => {
		product.checked = !product.checked;
		const prod = { id: product.id, product: product.name, price: product.price };

		if (!product.checked)
			activeMenu.selectedProducts = activeMenu.selectedProducts.filter((p: any) => p.id !== product.id);
		else
			activeMenu.selectedProducts.push(prod);

		setActiveMenu({
			...activeMenu,
			selectedProducts: activeMenu.selectedProducts
		});
	}

	const dispatch = useDispatch();

	const handleAddCart = () => {
		activeMenu.selectedProducts.forEach((product: any) => {
			dispatch(addToCart(product));
		});

		activeMenu.products.forEach((category: any) => {
			category.products.forEach((product: any) => {
				product.checked = false;
			});
		});

		setActiveMenu({
			...activeMenu,
			selectedProducts: []
		});

		dispatch(showSnackbar({ message: 'Productos añadidos satisfactoriamente' }));
	}

	return (
		<>
			<Banner timeToPass={5000} />
			<Container fixed>
				<Grid container className="background1">
					<Grid xs={12} display="flex" justifyContent="center" mt={5}>
						<Typography sx={{ typography: { xs: 'h4', sm: 'h2', md: 'h1' } }} color="orange">Menú del día</Typography>
					</Grid>
					{
						isLoading && activeMenu.products.length === 0 && (
							<Grid xs={12} display="flex" justifyContent="center">
								<CircularProgress color="secondary" />
							</Grid>
						)
					}
					<Grid xs={12} display="flex" justifyContent="center" textAlign="center">
						<Typography sx={{ typography: { xs: 'h5', sm: 'h4', md: 'h3' } }} color="green">{activeMenu.description}</Typography>
					</Grid>
					<Grid container xs={12}>
						{activeMenu.products.length !== 0 &&
							activeMenu.products.map((item: any, index: any) => (
								<Grid container xs={12} display="flex" justifyContent="start" columnSpacing={10} my={6} key={index}>
									<Grid xs={12} display="flex" justifyContent="center">
										<Typography sx={{ typography: { xs: 'h5', md: 'h4' } }} color="secondary" noWrap>
											{item.category.toUpperCase()}
										</Typography>
									</Grid>

									{item.products.map((p: any, index: any) => (
										<Grid container xs={12} sm={6} columnSpacing={5} key={p.id} >
											<Grid xs={1} display="flex" alignItems="center">
												<Checkbox checked={p.checked} onChange={() => handleSelectProduct(p)} />
											</Grid>
											<Grid xs={6} display="flex" justifyContent="start" alignItems="center">
												<Typography sx={{ typography: {xs: 'body1', sm: 'h6'} }}>
													{p.name}
												</Typography>
											</Grid>
											<Grid xs={4} display="flex" alignItems="center" p={0}>
												<Typography sx={{ typography: {xs: 'body1', sm: 'h6'} }}>
													$ {p.price}
												</Typography>
											</Grid>
										</Grid>
									))}
								</Grid>
							))
						}
					</Grid>
				</Grid>

				<Zoom
					in={activeMenu.selectedProducts.length !== 0}
					unmountOnExit
				>
					<Tooltip title="Agregar al carrito">
						<Fab color="primary" aria-label="add" className="add-shopping-cart-btn" onClick={() => handleAddCart()}>
							<Icon>add_shopping_cart</Icon>
						</Fab>
					</Tooltip>
				</Zoom>
			</Container >
		</>
	);
}
