import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '@/app/redux/snack.slice';

import { Alert, Snackbar } from "@mui/material";

export default function MySnackbar() {
	const snack = useSelector((state: any) => state.snack);

	const dispatch = useDispatch();

	const handleSnackClose = () => {
		dispatch(hideSnackbar());
	}

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snack.show}
            autoHideDuration={snack.duration}
            onClose={handleSnackClose}
        >
            <Alert
                severity={snack.type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snack.message}
            </Alert>
        </Snackbar>
    )
}