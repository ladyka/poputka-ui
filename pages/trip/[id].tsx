import {useRouter} from 'next/router';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {PaletteMode} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';

import TripView from "@/app/trip/TripView";
import useTripGetService from "@/app/services/TripService";
import Container from "@mui/material/Container";
import {ToggleCustomTheme} from "@/app/customThemeService";
import {TripCompanionView} from "@/app/dti/TripCompanionView";

export default function TripIdPage() {
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

    const router = useRouter();
    const {id} = router.query;
    const tripId = typeof id === 'string' ? id : '-1'

    let tripGetService = useTripGetService()
    const [trip, setTrip] = useState<TripCompanionView | null>(null)

    useEffect(() => {
        if (trip || (tripId === '-1')) {
            return;
        }
        tripGetService(parseInt(tripId))
            .then(data => {
                setTrip(data);
            })
            .catch(reason => {
                console.error(reason)
            });
    }, [trip, tripGetService, tripId])

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline/>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
            <Box sx={{bgcolor: 'background.default'}}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: {xs: 14, sm: 20},
                        pb: {xs: 8, sm: 12},
                    }}
                >
                    {trip && (<TripView trip={trip}/>)}
                    {(!trip) && (<h2>Поездка не может быть отображена или загружается!</h2>)}
                </Container>
                <Divider/>
            </Box>
            <Footer/>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
