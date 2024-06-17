'use client'
import * as React from 'react';
import {alpha, PaletteMode} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';

import {ToggleCustomTheme} from "@/app/customThemeService";
import Container from "@mui/material/Container";
import ProfileEdit from "@/app/components/ProfileEdit";

export default function Profile() {
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
                        <ProfileEdit/>
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
