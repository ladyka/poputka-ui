import {TripCompanion} from "@/app/dti/TripCompanion";

import * as React from 'react';
import {useState} from 'react';


import {Grid} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {NEW_TRIP_ID} from "@/pages/trip";
import CityAutocompleteInputField from "@/app/components/CityAutocompleteInputField";
import TripDatePicker from "@/app/components/TripDatePicker";
import TripTimePicker from "@/app/components/TripTimePicker";
import CurrencyRadioButtonsGroup from "../components/CurrencyRadioButtonsGroup";
import {Dayjs} from "dayjs";

interface TripEditProps {
    trip: TripCompanion;
    setEditMode: any;
}

const TripEdit = (p: TripEditProps) => {
    const trip = p.trip
    const setEditMode = p.setEditMode
    const [from, setFrom] = useState<string>(trip.from);
    const [to, setTo] = useState<string>(trip.to);
    const [date, setDate] = React.useState<Dayjs>(trip.date);
    const [time, setTime] = useState(trip.time);
    const [passengers, setPassengers] = useState(trip.passengers);
    const [currency, setCurrency] = useState(trip.currency);
    const [description, setDescription] = useState(trip.description);
    const [price, setPrice] = useState(trip.price);

    function handleSubmit() {
        trip.from = from
        trip.to = to
        trip.date = date
        trip.time = time
        trip.passengers = passengers
        trip.currency = currency
        trip.description = description
        trip.price = price
        setEditMode(false)
    }

    return (
        <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '70%'}}}>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{pt: 2, width: {xs: '100%', sm: 'auto'}}}
            >
                <form>
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            {trip.id !== NEW_TRIP_ID && (<h2>Редактирование информации о поездке {trip.id}</h2>)}
                            {trip.id === NEW_TRIP_ID && (<h2>Создание новой поездки</h2>)}
                        </Grid>
                        <Grid item>
                            <CityAutocompleteInputField city={from} setCity={setFrom} labelText={"Откуда"}/>
                        </Grid>
                        <Grid item>
                            <CityAutocompleteInputField city={to} setCity={setTo} labelText={"Куда"}/>
                        </Grid>
                        <Grid item>
                            <TripDatePicker date={date} setDate={setDate} label={"Дата отправления"}/>
                        </Grid>
                        <Grid item>
                            <TripTimePicker time={time} setTime={setTime} label={"Время отправления"}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'number'}
                                label="Стоимость" variant="outlined" fullWidth value={price} onChange={event => {
                                try {
                                    const p = parseInt(event.target.value)
                                    if (p > 0) {
                                        setPrice(p)
                                    } else {
                                        setPrice(0)
                                    }

                                } catch (any) {
                                    setPrice(0)
                                }
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <CurrencyRadioButtonsGroup value={currency} setValue={setCurrency} label="Валюта"/>
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'number'}
                                label="Количество пассажиров" variant="outlined" fullWidth value={passengers}
                                onChange={event => {
                                    try {
                                        const p = parseInt(event.target.value)
                                        if (p > 0) {
                                            setPassengers(p)
                                        } else {
                                            setPassengers(0)
                                        }
                                    } catch (any) {
                                        setPassengers(0)
                                    }
                                }}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="Коментарии и пожелания к поездке"
                                value={description}
                                onChange={event => {
                                    setDescription(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                Опубликовать
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Stack>
            <Typography variant="caption" textAlign="center" sx={{opacity: 0.8}}>
                {/*By clicking &quot;Start now&quot; you agree to our&nbsp;*/}
                Нажимая «Начать сейчас», вы соглашаетесь с нашими&nbsp;
                <Link href="/termsandconditions" color="primary">
                    {/*Terms & Conditions*/}
                    Условиями и положениями
                </Link>
                .
            </Typography>
        </Stack>
    );
}

export default TripEdit;