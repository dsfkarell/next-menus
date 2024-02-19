import React, { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, Icon, TextField, Typography } from "@mui/material";

import Grid from '@mui/material/Unstable_Grid2';
import HoverableCard from "@/app/components/HoverableCard";

async function getProducts() {
    const res = await fetch('/api/products');
    const data = await res.json();
    return data;
}

export default function ProductsSelector({ handleAddProduct }: any) {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSearchText('');
    };

    const [searchText, setSearchText]: [String, any] = useState('');

    const handleSearchText = (event: any) => {
        setSearchText(event.target.value);
    };

    const handleAddProductAndClose = (product: any) => {
        product.price = '0';
        handleAddProduct(product);
        handleClose();
    };

    const [products, setProducts]: any = useState([]);

    const filteredProducts = products.filter((p: any) => p.name.toLowerCase().includes(searchText.toLowerCase()));

    async function fetchData() {
        const data = await getProducts();
        setProducts(data);

        return data;
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
		.catch(() => {
			// Handle fetch error
			dispatch(showSnackbar({ message: 'Ocurrió un error al obtener los productos', type: 'error', duration: 3000 }));
		});;
    }, []);

    return (
        <React.Fragment>
            <Button variant='contained' color='inherit' onClick={handleClickOpen}>
                <Icon>add</Icon>
                Adicionar Producto
            </Button>

            <Dialog
                maxWidth={'md'}
                fullWidth={true}
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <Typography variant="h4" textAlign="center">
                        Productos
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="flex-end">
                        <Icon>search</Icon>
                        <TextField id="search" label="Buscar producto" variant="standard" value={searchText} onChange={handleSearchText} />
                    </Box>
                    <Grid container spacing={2} justifyContent="space-around">
                        {filteredProducts.length !== 0 && filteredProducts.map((product: any, index: any) => (
                            <Grid xs={12} sm={6} md={4} lg={3} mt={3} key={index} onClick={() => handleAddProductAndClose(product)}>
                                <HoverableCard>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image="/images/comida.jpg"
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Grid container>
                                                <Grid xs={12} display="flex" justifyContent="center">
                                                    <Typography noWrap>
                                                        <b>{product.name}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid xs={12} display="flex" justifyContent="center">
                                                    <Typography noWrap>
                                                        {product.category}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </HoverableCard>
                            </Grid>
                        ))}
                        {filteredProducts.length === 0 && (
                            <Typography mt={5}>No se encontraron resultados</Typography>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}