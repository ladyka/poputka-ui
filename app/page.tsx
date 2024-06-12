'use client'

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
import SearchForm from '@/app/components/SearchForm';
import {ToggleCustomTheme} from "@/app/customThemeService";

const Home = () => {
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

  return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <SearchForm from_default={'Минск'} to_default={'Молодечно'} />
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
}

export default Home