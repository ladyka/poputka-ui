import { useRouter } from 'next/router';
import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';

import TripView from "@/app/trip/TripView";
import useTripGetService from "@/app/services/TripService";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import Container from "@mui/material/Container";
import {ToggleCustomTheme} from "@/app/customThemeService";

export default function TripIdPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };
    const cyrb53 = (str: string, seed = 0) => {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for(let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    const router = useRouter();
    const { id } = router.query;
    const tripId = typeof id === 'string' ? id : '-1'
    let tripGetService = useTripGetService()
    let trip: TripCompanionView = tripGetService(tripId);
    trip.price = cyrb53(tripId) % 1000
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <TripView trip={trip}/>
                </Container>

                {/*<LogoCollection />*/}
                {/*<Features />*/}
                {/*<Divider />*/}
                {/*<Testimonials />*/}
                {/*<Divider />*/}
                {/*<Highlights />*/}
                {/*<Divider />*/}
                {/*<Pricing />*/}
                {/*<Divider />*/}

                <Divider />

            </Box>
            <Footer />
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
