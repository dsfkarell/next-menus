'use client';
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

import NewProduct from './NewProduct';
import Product from './Product';

import Grid from '@mui/material/Unstable_Grid2';

async function getProducts() {
    const res = await fetch('/api/products');
    const data = await res.json();
    return data;
}

function Products() {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

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
		.catch(error => {
			// Handle fetch error
			dispatch(showSnackbar({ message: 'Ocurrió un error al obtener los productos', type: 'error', duration: 3000 }));
		});
    }, []);

    return (
        <Grid container spacing={5}>

            <Grid xs={12} sm={6} md={6} lg={3}>
                <NewProduct fetchProducts={fetchData} />
            </Grid>

            {products.map((product: any, index: any) => (
                <Grid xs={12} sm={6} md={6} lg={3} key={index}>
                    <Product product={product} fetchProducts={fetchData} />
                </Grid>
            ))}

        </Grid>
    );
}

export default Products;