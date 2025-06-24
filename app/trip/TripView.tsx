import {NEW_TRIP_ID} from "@/pages/trip";
import * as React from "react";
import Link from "@mui/material/Link";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import {Card, CardContent, Typography} from "@mui/material";
import dayjs from "dayjs";

interface TripViewProps {
    trip: TripCompanionView;
}

const TripView = ({trip}: TripViewProps) => {
    return (
        <Card key={trip.id} sx={{
            width: '100%',
            padding: '10px'
        }}>
            <CardContent>
                {trip.id !== NEW_TRIP_ID && (<h2>Информация о поездке {trip.id}</h2>)}
                {trip.id === NEW_TRIP_ID && (<h2>Информация о новой поездке</h2>)}
                <br/>
                <Typography variant="h5"> Поездка из {trip.from} в {trip.to}</Typography>
                {/* <Typography>Стоимость: {trip.price} {trip.currency}<br/></Typography> */}
                <Typography>Дата отправления: {dayjs(trip.start).format('YYYY-MM-DD')}</Typography>
                <Typography>Время отправления: {dayjs(trip.start).format('HH:mm')}</Typography>
                <Typography>Количество свободных мест для пассажиров: {trip.passengers}</Typography>
                <Typography>Комментарий водителя : {trip.description}<br/></Typography>
                {trip.car && (<Typography>Автомобиль: {trip.car}</Typography>)}
                {trip.driverName && (<Typography>Водитель : {trip.driverName}<br/></Typography>)}
                {trip.ownerTelegramUsername && (<Link href={"https://t.me/" + trip.ownerTelegramUsername}>
                    Забронировать место(Написать водителю в телеграм)
                </Link>)}
            </CardContent>
        </Card>
        )
}

export default TripView;