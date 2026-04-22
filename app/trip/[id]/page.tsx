"use client"
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, PaletteMode, TextField, Typography} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppAppBar from '@/app/components/AppAppBar';
import Footer from '@/app/components/Footer';
import getLPTheme from '@/app/getLPTheme';

import TripView from "@/app/trip/TripView";
import useTripGetService from "@/app/services/TripService";
import Container from "@mui/material/Container";
import {ToggleCustomTheme} from "@/app/customThemeService";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import { useCreateBooking } from '@/app/services/DialogService';
import { TripBookingReviewEditor } from "@/app/components/TripBookingReviewEditor";

export default function TripIdPage() {
    const params = useParams();
    const id = params?.id as string;
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({palette: {mode}});
    const createBooking = useCreateBooking();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [reviewOpen, setReviewOpen] = useState(false);
    const [reviewBookingId, setReviewBookingId] = useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputValue('');
    };

    const handleSubmit = () => {
        handleCreateBooking()
        handleClose();
    };


    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const router = useRouter();
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

    useEffect(() => {
        if (typeof window === "undefined") return;

        const url = new URL(window.location.href);
        const wantsReview = url.searchParams.get("review") === "1";
        const bookingId = url.searchParams.get("bookingId") ?? "";

        if (!wantsReview || !bookingId) {
            return;
        }

        setReviewBookingId(bookingId);
        setReviewOpen(true);
    }, [tripId]);

    const handleCreateBooking = () => {
        if (trip?.id) {
            createBooking.mutate(
                { tripId: trip.id, message: inputValue },
                {
                    onSuccess(res) {
                        router.push(`/dialogs/${res.id}`)
                    },
                    onError(err) {
                        console.error("Failed to navigate:", err);
                        alert("Failed to navigate");
                    },
                }
            );
        }
    };

    const handleCloseReview = () => {
        setReviewOpen(false);

        if (typeof window === "undefined") return;
        const url = new URL(window.location.href);
        url.searchParams.delete("review");
        url.searchParams.delete("bookingId");
        router.replace(`${url.pathname}${url.search}${url.hash}`);
    };

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
                <Button
                    color="primary"
                    variant="contained"
                    sx={{width: '80%', margin: '0 10%'}}
                    onClick={handleClickOpen}
                >
                    Написать водителю
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        width: '90%'
                    }
                }}
            >
                <DialogTitle>Сообщение Водителю</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    multiline
                    label="Введите приветственное сообщение"
                    fullWidth
                    variant="outlined"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    Бронировать
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={reviewOpen}
                onClose={handleCloseReview}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Отзыв о поездке</DialogTitle>
                <DialogContent>
                    {reviewBookingId ? (
                        <TripBookingReviewEditor bookingId={reviewBookingId} />
                    ) : (
                        <Typography>Не указан bookingId.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReview} color="secondary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <Footer/>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
