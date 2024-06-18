import {TripCompanionEdit} from "@/app/dti/TripCompanionEdit";
import {NEW_TRIP_ID} from "@/pages/trip";
import * as React from "react";
import Link from "@mui/material/Link";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import {Typography} from "@mui/material";
import dayjs from "dayjs";

interface TripViewProps {
    trip: TripCompanionView;
}

const TripView = ({trip}: TripViewProps) => {
    return (<>
        {trip.id !== NEW_TRIP_ID && (<h2>Информация о поездке {trip.id}</h2>)}
        {trip.id === NEW_TRIP_ID && (<h2>Информация о новой поездке</h2>)}
        <br/>
        <Typography>Отправление: {trip.from}<br/></Typography>
        <Typography>Пункт назначения: {trip.to}<br/></Typography>
        <Typography>Стоимость: {trip.price} {trip.currency}<br/></Typography>
        <Typography>Дата и время отправления {trip.start.toString()}<br/></Typography>
        <Typography>Дата отправления: {dayjs(trip.start).format('YYYY-MM-DD')}</Typography>
        <Typography>Время отправления: {dayjs(trip.start).format('HH:mm')}</Typography>
        <Typography>Пассажиры {trip.passengers}<br/></Typography>
        <Typography>Комментарии {trip.description}<br/></Typography>
        <Typography>Водитель : {trip.driverName}<br/></Typography>
        <Link href={"https://t.me/" + trip.ownerTelegramUsername}>
            Забронировать место(Написать водителю в телеграм)
        </Link>
    </>)
}

export default TripView;