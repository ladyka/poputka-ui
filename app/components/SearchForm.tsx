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
import PlaceAutocompleteInputField from "@/app/components/PlaceAutocompleteInputField";
import TripDatePicker from "@/app/components/TripDatePicker";
import {Place} from "@/app/dti/place";

interface SearchFormProps {
    from_default: string
    to_default: string
}

export default function SearchForm({from_default, to_default}: SearchFormProps) {
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [placeFrom, setPlaceFrom] = React.useState<Place>({
        name: from_default,
        displayName: from_default,
        latitude: 53.902233,
        longitude: 27.561888
    })
    const [placeTo, setPlaceTo] = React.useState<Place>({
        name: to_default,
        displayName: to_default,
        latitude: 53.902233,
        longitude: 27.561888
    })

    const [passengers, setPassengers] = useState(1);
    const router = useRouter();
    const handleSearch = () => {
        // Действия по выполнению поиска
        console.log(`Searching for trips from ${placeFrom.name} to ${placeTo.name} on ${date} for ${passengers} passengers`);
        if ((placeFrom.name && placeFrom.name.trim().length > 0) && (placeTo.name && placeTo.name.trim().length > 0)) {
            const url = `/ride-sharing/${placeFrom.name}/${placeTo.name}`
            router.push(url);
            window.location.href = url
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
                <Stack spacing={2} useFlexGap sx={{
                    width: {xs: '100%', sm: '70%'},
                    marginBottom: '40px'
                }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', md: 'row'},
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
                        sx={{alignSelf: 'center', width: {sm: '100%', md: '80%'}}}
                    >
                        Место в котором водители и попутчики находят друг-друга.
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <PlaceAutocompleteInputField place={placeFrom} setPlace={setPlaceFrom} labelText={"Откуда"}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <PlaceAutocompleteInputField place={placeTo} setPlace={setPlaceTo} labelText={"Куда"}/>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TripDatePicker date={date} setDate={setDate} label={"Дата"} isPast={true}/>
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
                        <Button variant="contained" color="primary" onClick={handleSearch}
                                sx={{width: '100%', margin: '10px'}}>
                            Найти
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
