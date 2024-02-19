'use client';
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

import NewMenu from './NewMenu';
import Menu from './Menu';

import Grid from '@mui/material/Unstable_Grid2';

async function getMenus() {
    const res = await fetch('/api/menus');
    const data = await res.json();
    return data;
}

function PersonalizeMenus() {
	const dispatch = useDispatch();

	const [menus, setMenus] = useState([]);

    async function fetchData() {
        const data = await getMenus();
		data.sort((menu1: any, _: any)=> menu1.active ? -1 : 1);
        setMenus(data);

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
			dispatch(showSnackbar({ message: 'Ocurrió un error al obtener los menús', type: 'error', duration: 3000 }));
		});
    }, []);

	return (
		<Grid container spacing={5}>

			<Grid xs={12} sm={6} md={6} lg={3}>
				<NewMenu fetchMenus={fetchData} />
			</Grid>

			{menus.map((menu: any, index: any) => (
				<Grid xs={12} sm={6} md={6} lg={3} key={index}>
					<Menu menu={menu} fetchMenus={fetchData} />
				</Grid>
			))}

		</Grid>
	)
}

export default PersonalizeMenus;