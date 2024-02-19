import React, { CSSProperties, ReactNode, useState } from 'react';
import Paper from '@mui/material/Paper';

interface HoverableCardProps {
    children: ReactNode;
    style?: CSSProperties;
}

const HoverableCard: React.FC<HoverableCardProps> = ({ children, style }) => {
    const [elevation, setElevation] = useState(1);

    return (
        <Paper
            elevation={elevation}
            onMouseEnter={() => setElevation(10)} // Adjust the elevation on hover
            onMouseLeave={() => setElevation(1)} // Reset the elevation on mouse leave
            className='hoverable'
            style={style}
        >
            {children}
        </Paper>
    );
};

export default HoverableCard;