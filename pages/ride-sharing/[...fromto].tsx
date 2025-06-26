import {useRouter} from 'next/router';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link, PaletteMode} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';

import Container from "@mui/material/Container";
import {ToggleCustomTheme} from "@/app/customThemeService";
import SearchForm from "@/app/components/SearchForm";
import {useTripsSearchService} from "@/app/services/TripService";
import Button from "@mui/material/Button";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import TripView from "@/app/trip/TripView";

export default function RideSharing() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({palette: {mode}});
    const [trips, setTrips] = useState<TripCompanionView[]>([])
    const [searchFormShow, setSearchFormShow] = useState<boolean>(false)

    const router = useRouter();
    const {fromto} = router.query;
    let from = "Minsk"
    let to = "Minsk"
    useEffect(() => {
        if (Array.isArray(fromto)) {
            setFromPlace(fromto[0]);
            setToPlace(fromto[1]);
        }
    }, [fromto]);

    const [fromPlace, setFromPlace] = useState<string>(from)
    const [toPlace, setToPlace] = useState<string>(to)
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    let tripsSearchService = useTripsSearchService();
    useEffect(() => {
        if (!((fromPlace === null || fromPlace.trim() === "") || (toPlace === null || toPlace.trim() === ""))) {
            tripsSearchService(fromPlace, toPlace)
                .then(value => {
                    setTrips(value.data)
                })
                .catch(reason => {
                    console.error(reason)
                })
        }
    }, [fromPlace, toPlace, tripsSearchService]);
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline/>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
            {searchFormShow && (<SearchForm from_default={fromPlace} to_default={toPlace}/>)}
            <hr/>
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
                    <h1>
                        Список поездок из {fromPlace} в {toPlace}. Найдено всего {trips.length} .
                    </h1>
                    {!searchFormShow && (<Button variant="contained" color="primary"
                                                 onClick={event => {
                                                     setSearchFormShow(true)
                                                 }}
                                                 sx={{width: '100%', margin: '10px'}}>
                        Поискать ещё маршруты
                    </Button>)}
                    {trips.map((trip) => (
                        <Link key={trip.id} href={'/trip/' + trip.id}>
                            <TripView trip={trip} />
                        </Link>
                    ))}
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
