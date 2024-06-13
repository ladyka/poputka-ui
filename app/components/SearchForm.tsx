import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {alpha} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs, {Dayjs} from 'dayjs';
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";
import CityAutocompleteInputField from "@/app/components/CityAutocompleteInputField";
import TripDatePicker from "@/app/components/TripDatePicker";

interface SearchFormProps {
    from_default: string
    to_default: string
}

export default function SearchForm({from_default, to_default} : SearchFormProps) {
    const [from, setFrom] = useState<string>(from_default);
    const [to, setTo] = useState<string>(to_default);
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());

    const [passengers, setPassengers] = useState(1);
    const router = useRouter();
    const handleSearch = () => {
        // Действия по выполнению поиска
        console.log(`Searching for trips from ${from} to ${to} on ${date} for ${passengers} passengers`);
        if ((from && from.trim().length > 0) && (to && to.trim().length > 0)) {
            const url = `/ride-sharing/${from}/${to}`
            router.push(url);
        }
    };
    return (
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
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' },
                    marginBottom: '40px' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Попутка&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(3rem, 10vw, 4rem)',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            BY
                        </Typography>
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Место в котором водители и попутчики находят друг-друга.
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <CityAutocompleteInputField city={from} setCity={setFrom} labelText={"Откуда"}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CityAutocompleteInputField city={to} setCity={setTo} labelText={"Куда"}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TripDatePicker date={date} setDate={setDate} label={"Дата"}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Количество человек"
                            type="number"
                            value={passengers}
                            onChange={(e) => {
                                const p = parseInt(e.target.value)
                                if (p > 0 && p < 10) {
                                    setPassengers(p)
                                } else {
                                    setPassengers(0)
                                }

                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid>
                    <Grid item xs={12} sm={12}>
                        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ width: '100%', margin: '10px'}}>
                            Найти
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
