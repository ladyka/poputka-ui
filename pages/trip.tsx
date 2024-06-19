'use client'
import * as React from 'react';
import {useState} from 'react';
import {alpha, PaletteMode} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';

import {ToggleCustomTheme} from "@/app/customThemeService";
import TripEdit from "@/app/trip/TripEdit";
import {TripCompanionEdit} from "@/app/dti/TripCompanionEdit";
import dayjs from "dayjs";
import TripView from "@/app/trip/TripView";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {useTripEditService} from "@/app/services/TripService";
import {useRouter} from "next/router";

export const NEW_TRIP_ID = -1

export default function NewTrip() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({palette: {mode}});

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const [editMode, setEditMode] = React.useState<boolean>(true)

    const tripEditService = useTripEditService()
    const router = useRouter();

    const [editTrip, setEditTrip] = useState<TripCompanionEdit>({
        start: dayjs().set('minute', 0).set('hours', dayjs().hour() + 1),
        currency: "BYN",
        description: "",
        from: "Минск",
        id: NEW_TRIP_ID,
        price: 20,
        to: "Минск",
        passengers: 3
    })

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline/>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
            <Box sx={{bgcolor: 'background.default'}}>
                <Box
                    sx={(theme) => ({
                        width: '100%',
                        backgroundImage:
                            theme.palette.mode === 'light'
                                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                                : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                        backgroundSize: '100% 20%',
                        backgroundRepeat: 'no-repeat',
                    })}
                >
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            pt: {xs: 14, sm: 20},
                            pb: {xs: 8, sm: 12},
                        }}
                    >
                        {editMode && (<TripEdit trip={editTrip} setEditMode={setEditMode} setTrip={setEditTrip}/>)}
                        {!editMode && (
                            <>
                                <TripView trip={{
                                    start: editTrip.start,
                                    currency: editTrip.currency,
                                    description: editTrip.description,
                                    from: editTrip.from,
                                    id: editTrip.id,
                                    price: editTrip.price,
                                    to: editTrip.to,
                                    passengers: editTrip.passengers,
                                    car: "",
                                    driverName: "",
                                    ownerTelegramUsername: ""
                                }}/>
                                <Button variant="contained" color="primary" fullWidth
                                        onClick={event => {
                                    setEditMode(true)
                                }}>
                                    Нужно внести изменения
                                </Button>
                                <Button variant="contained" color="primary" fullWidth
                                        onClick={event => {
                                    console.log(editTrip)
                                    tripEditService(editTrip).then(value => {
                                        const url = `/trip/${value.data.id}`
                                        router.push(url);
                                    }).catch(reason => {
                                        console.log(reason)
                                        alert("Что-то пошло не так, уже чиним. Попробуйте позже!!!")
                                    })
                                }}>
                                    Всё верно. Опубликовать
                                </Button>
                            </>
                        )}
                        <Divider/>
                    </Container>
                </Box>
            </Box>
            <Footer/>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
