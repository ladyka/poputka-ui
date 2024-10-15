import * as React from 'react';
import {PaletteMode} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '@/app/components/AppAppBar';
import LogoCollection from '@/app/components/LogoCollection';
import Highlights from '@/app/components/Highlights';
import Pricing from '@/app/components/Pricing';
import Features from '@/app/components/Features';
import Testimonials from '@/app/components/Testimonials';
import FAQ from '@/app/components/FAQ';
import Footer from '@/app/components/Footer';
import getLPTheme from '../getLPTheme';
import SearchForm from "@/app/components/SearchForm";

interface ToggleCustomThemeProps {
    showCustomTheme: Boolean;
    toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
                               showCustomTheme,
                               toggleCustomTheme,
                           }: ToggleCustomThemeProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Platform"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{fontSize: '20px', mr: 1}}/>
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>Material Design 2</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default function LandingPage() {
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
            <SearchForm to_default={'Maladzyechna'} from_default={'Minsk'}/>
            <Box sx={{bgcolor: 'background.default'}}>
                <LogoCollection/>
                <Divider/>
                <Features/>
                <Divider/>
                <Testimonials/>
                <Divider/>
                <Highlights/>
                <Divider/>
                <Pricing/>
                <Divider/>
                <FAQ/>
                <Divider/>
                <Footer/>
            </Box>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
