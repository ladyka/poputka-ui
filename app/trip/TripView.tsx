import {TripCompanion} from "@/app/dti/TripCompanion";
import {NEW_TRIP_ID} from "@/pages/trip";
import * as React from "react";
import Link from "@mui/material/Link";

interface TripViewProps {
    trip: TripCompanion;
}

const TripView = ({trip}: TripViewProps) => {
    return (<>

        {trip.id !== NEW_TRIP_ID && (<h2>Информация о поездке {trip.id}</h2>)}
        {trip.id === NEW_TRIP_ID && (<h2>Информация о новой поездке</h2>)}
        <br/>
        Отправление: {trip.from}<br/>
        Пункт назначения: {trip.to}<br/>
        Стоимость: {trip.price} {trip.currency}<br/>
        <br/>
        Дата и время отправления {trip.start.toString()}<br/>
        Пассажиры {trip.passengers}<br/>
        Комментарии {trip.description}<br/>
        Водитель : {trip.driverName}<br/>
        <Link href={"https://t.me/" + trip.ownerTelegramUsername}>
            Забронировать место(Написать водителю в телеграм)
        </Link>
    </>)
}

export default TripView;