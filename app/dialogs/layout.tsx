'use client';

import {ReactNode, useMemo, useState} from 'react';
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    PaletteMode,
    ThemeProvider,
    Typography,
    useMediaQuery
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Right arrow icon
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';
import {useGetBookings} from "@/app/services/DialogService";
import {formatDateLabel, formatTimeLabel} from '../utils/dateFormatters';
import {useParams, useRouter} from 'next/navigation';
import {getBookingStatusLabel} from "@/app/utils/bookingStatus";

export default function DialogsLayout({children}: { children: ReactNode }) {
    const [mode, setMode] = useState<PaletteMode>('light');
    const [showCustomTheme] = useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({palette: {mode}});
    const toggleColorMode = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

    const {data, isLoading, error} = useGetBookings();
    const chatList = useMemo(() => data || [], [data]);

    const isMobile = useMediaQuery('(max-width:900px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const router = useRouter();
    const params = useParams();
    const selectedId = params?.id;

    const ChatMenu = (
        <Box sx={{width: 250}}>
            <Typography variant="h6" sx={{p: 2}}>Мои Диалоги</Typography>
            <Divider/>
            <List>
                {chatList.map((booking) => (
                    <ListItem
                        key={booking.bookingId}
                        onClick={() => {
                            router.push(`/dialogs/${booking.bookingId}`);
                            if (isMobile) closeDrawer();
                        }}
                        selected={selectedId === booking.bookingId}
                    >
                        <ListItemText
                            primary={booking.oppositeUserName}
                            secondary={
                                <Box>
                                    <Typography>Маршрут: {booking.placeFrom} - {booking.placeTo}</Typography>
                                    <Typography>Дата поездки: {formatDateLabel(booking.start)}</Typography>
                                    <Typography>Время поездки: {formatTimeLabel(booking.start)}</Typography>
                                    <Typography>
                                        Статус бронирования: {getBookingStatusLabel(booking.bookingStatus)}
                                    </Typography>
                                    <Typography>{booking.content}</Typography>
                                </Box>
                            }
                            primaryTypographyProps={{noWrap: true}}
                            secondaryTypographyProps={{ component: "div" }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline/>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>

            <Box sx={{bgcolor: 'background.default'}}>
                <Box sx={{position: 'relative'}}>
                    {isMobile && (
                        <IconButton
                            onClick={openDrawer}
                            sx={{
                                position: 'fixed',
                                top: "50%",
                                left: 16,
                                zIndex: 11,
                                backgroundColor: 'background.paper',
                                boxShadow: 3,
                            }}
                        >
                            <ChevronRightIcon/>
                        </IconButton>
                    )}
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            gap: 2,
                            pt: {xs: 14, sm: 20},
                            pb: {xs: 8, sm: 12},
                        }}
                    >
                        {isMobile ? (
                            <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
                                {ChatMenu}
                            </Drawer>
                        ) : (
                            <Box
                                sx={{
                                    width: '30%',
                                    borderRight: '1px solid #ccc',
                                    pr: 2,
                                    height: '70vh',
                                    overflow: 'auto',
                                }}
                            >
                                {ChatMenu}
                            </Box>
                        )}
                        <Box
                            sx={{
                                width: isMobile ? '100%' : '70%',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '70vh',
                            }}
                        >
                            {children}
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Footer/>
        </ThemeProvider>
    );
}
