'use client';

import React from 'react';

import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/app/redux/snack.slice';

import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Icon, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import EditMenu from './EditMenu';

export default function Menu({ menu, fetchMenus }: any) {
    const dispatch = useDispatch();

    const [openActivateMenu, setOpenActivateMenu] = React.useState(false);

    const handleClickOpen = () => {
        setOpenActivateMenu(true);
    };

    const handleClose = () => {
        setOpenActivateMenu(false);
    };

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleActivateMenu = () => {
        handleClose();

        fetch(`/api/menus/${menu.id}/activate`, {
            method: 'POST',
        })
            .then(response => {
                if (response.ok) {
                    // Handle success response
                    fetchMenus();
                    dispatch(showSnackbar({ message: 'Menú activado satisfactoriamente', type: 'success', duration: 3000 }));
                } else {
                    // Handle error response
                    throw new Error();
                }
            })
            .catch(error => {
                // Handle fetch error
                dispatch(showSnackbar({ message: 'No se pudo activar el menú seleccionado', type: 'error', duration: 3000 }));
            });
    };

    const handleDeleteMenu = () => {
        handleCloseDeleteDialog();

        fetch(`/api/menus/${menu.id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Handle success response
                    fetchMenus();
                    dispatch(showSnackbar({ message: 'Menú eliminado satisfactoriamente', type: 'success', duration: 3000 }));
                } else {
                    // Handle error response
                    throw new Error();
                }
            })
            .catch(error => {
                // Handle fetch error
                dispatch(showSnackbar({ message: 'Ocurrió un error al eliminar el menú', type: 'error', duration: 3000 }));
            });
    };

    return (
        <>
            <Card>
                <CardMedia
                    component="img"
                    height="194"
                    image="/images/menu.jpg"
                    alt={menu.title}
                />
                <CardContent>
                    <Grid textAlign="center">
                        <Typography variant="h5" noWrap>
                            Menú - {menu.title}
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container spacing={1} minHeight={50} width='100%'>
                        <Grid xs display="flex" justifyContent="center" alignItems="center">
                            <EditMenu menu={menu} fetchMenus={fetchMenus} />
                        </Grid>
                        <Grid display="flex" justifyContent="center" alignItems="center">
                            <Tooltip title="Activar">
                                <Fab disabled={menu.active} size="small" color='success' onClick={handleClickOpen}>
                                    <Icon>check</Icon>
                                </Fab>
                            </Tooltip>
                        </Grid>
                        <Grid xs display="flex" justifyContent="center" alignItems="center">
                            <Tooltip title="Eliminar">
                                <Fab disabled={menu.active} size="small" color='error' onClick={handleClickOpenDeleteDialog}>
                                    <Icon>delete</Icon>
                                </Fab>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>

            <Dialog
                open={openActivateMenu}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Icon color="warning">warning</Icon>
                    {' '} Activar
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        ¿Está seguro que desea poner este menú visible a los usuarios?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" color="success" onClick={handleActivateMenu}>Activar</Button>
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
                        ¿Está seguro que desea eliminar este menú?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
                    <Button variant="contained" color="error" onClick={handleDeleteMenu}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}