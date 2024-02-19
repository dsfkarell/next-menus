import { useState } from "react";
import { Card, CardContent, Fab, Icon, TextField, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";

export default function ProductInNewMenu({ product, handlePriceChange, handleRemoveProduct }: any) {
    
    const [localPrice, setLocalPrice] = useState(product.price || 0);
    
    const handlePriceInput = (event: any) => {
        const newPrice = event.target.value;
        setLocalPrice(newPrice);
        handlePriceChange(product.id, newPrice);
    };

    return (
        <Grid mt={2}>
            <Card elevation={4}>
                <CardContent>
                    <Grid container>
                        <Grid xs={12} sm={2}>
                            <Image
                                height={75}
                                width={100}
                                src='/images/comida.jpg'
                                alt={product.name} />
                        </Grid>
                        <Grid container xs={12} sm={7}>
                            <Grid xs={12} alignSelf="center">
                                <Typography noWrap>
                                    <b>{product.name}</b>
                                </Typography>
                            </Grid>
                            <Grid xs={12} alignSelf="center">
                                <Typography noWrap>
                                    {product.category}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={2}>
                            <TextField
                                type="number"
                                label="Precio*"
                                placeholder='000.00'
                                id="price"
                                sx={{p:1}}
                                InputProps={{
                                    startAdornment: <Icon>attach_money</Icon>,
                                }}
                                variant="standard"
                                value={localPrice}
                                onChange={handlePriceInput}
                            />
                        </Grid>
                        <Grid xs={12} sm={1} sx={{ textAlign: { xs: 'center', sm: 'right'}}} alignSelf="center">
                            <Tooltip title="Quitar del menú">
                                <Fab
                                    size='small'
                                    color='error'
                                    onClick={() => handleRemoveProduct(product.id)}>
                                    <Icon>delete</Icon>
                                </Fab>
                            </Tooltip>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}