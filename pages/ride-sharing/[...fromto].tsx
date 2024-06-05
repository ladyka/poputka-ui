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

import Container from "@mui/material/Container";
import {ToggleCustomTheme} from "@/app/customThemeService";
import SearchForm from "@/app/components/SearchForm";

export default function RideSharing() {
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

    const router = useRouter();
    const { fromto } = router.query;
    if (Array.isArray(fromto)) {
        const from = fromto[0]
        const to = fromto[1]
        return (
            <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
                <CssBaseline />
                <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
                {/*<SearchForm from={from} to={to}/>*/}
                <SearchForm/>
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
                        <h1>
                            Поездка из {from} в {to}
                        </h1>
                    </Container>
                    <Divider />

                </Box>
                <Footer />
                <ToggleCustomTheme
                    showCustomTheme={showCustomTheme}
                    toggleCustomTheme={toggleCustomTheme}
                />
            </ThemeProvider>
        );
    }  else {
        return (<></>)
    }
}
