import { Box, Icon, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";

export default function Banner({ timeToPass }: any) {
    const [duration, setDuration] = useState(timeToPass || 6000);

    const [images, setImages] = useState(['/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg', '/images/banner4.jpg']);

    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            var nextImgIndex = currentImgIndex + 1;

            if (nextImgIndex >= images.length) {
                nextImgIndex = 0;
            }

            setCurrentImgIndex(nextImgIndex);
        }, duration);
    }, [currentImgIndex]);

    return (
        <Grid xs={12} md={6}>

            <ImageListItem>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: {xs: '100%', sm:'40%', md: '30%'},
                        overflow: 'hidden',
                        borderRadius: 5,
                        boxShadow: 15
                    }}
                >
                    <img
                        src={images[currentImgIndex]}
                        alt="Banner"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover', // or 'contain' depending on your preference
                        }}
                    />
                    <ImageListItemBar
                        style={{height: '20%'}}
                        title="Bienvenido"
                        subtitle="Visite nuestro restaurante"
                    />
                </Box>
            </ImageListItem>
        </Grid >
    );
}