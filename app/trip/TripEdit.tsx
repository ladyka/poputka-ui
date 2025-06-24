import {TripCompanionEdit} from "@/app/dti/TripCompanionEdit";

import * as React from 'react';
import {useState} from 'react';


import {Grid} from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {NEW_TRIP_ID} from "@/pages/trip";
import PlaceAutocompleteInputField from "@/app/components/PlaceAutocompleteInputField";
import TripDatePicker from "@/app/components/TripDatePicker";
import TripTimePicker from "@/app/components/TripTimePicker";
import CurrencyRadioButtonsGroup from "../components/CurrencyRadioButtonsGroup";
import dayjs, {Dayjs} from "dayjs";
import {Place} from "@/app/dti/place";

interface TripEditProps {
    trip: TripCompanionEdit,
    setEditMode: any,
    setTrip: any,
}

const TripEdit = (p: TripEditProps) => {
    const trip = p.trip
    const setEditMode = p.setEditMode
    const setTrip = p.setTrip
    const [placeFrom, setPlaceFrom] = React.useState<Place>({
        name: trip.from.name,
        displayName: trip.from.name,
        latitude: 53.902233,
        longitude: 27.561888,
        osm_id: 59195,
        osm_type: "relation",
    })
    const [placeTo, setPlaceTo] = React.useState<Place>({
        name: trip.to.name,
        displayName: trip.to.name,
        latitude: 53.902233,
        longitude: 27.561888,
        osm_id: 59195,
        osm_type: "relation",
    })
    const [date, setDate] = React.useState<Dayjs>(trip.start);
    const [time, setTime] = useState(trip.start);
    const [passengers, setPassengers] = useState(trip.passengers);
    // const [currency, setCurrency] = useState(trip.currency);
    const [description, setDescription] = useState(trip.description);
    // const [price, setPrice] = useState(trip.price);

    function handleSubmit() {
        trip.from = { name: placeFrom.name, osm_id: placeFrom.osm_id, osm_type: placeFrom.osm_type }
        trip.to = { name: placeTo.name, osm_id: placeTo.osm_id, osm_type: placeTo.osm_type }
        trip.start = dayjs()
            .set('year', date.year())
            .set('month', date.month())
            .set('date', date.date())
            .set('hour', time.hour())
            .set('minute', time.minute())
            .set('second', 0)
        trip.passengers = passengers
        // trip.currency = currency
        trip.description = description
        // trip.price = price
        setTrip(trip)
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
                            <PlaceAutocompleteInputField place={placeFrom} setPlace={setPlaceFrom}
                                                         labelText={"Откуда"}/>
                        </Grid>
                        <Grid item>
                            <PlaceAutocompleteInputField place={placeTo} setPlace={setPlaceTo} labelText={"Куда"}/>
                        </Grid>
                        <Grid item>
                            <TripDatePicker date={date} setDate={setDate} label={"Дата отправления"} isPast={true}/>
                        </Grid>
                        <Grid item>
                            <TripTimePicker time={time} setTime={setTime} label={"Время отправления"}/>
                        </Grid>
                        {/* <Grid item>
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
                        </Grid> */}
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