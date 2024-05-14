import Button from "@mui/material/Button";
import {TripCompanionView} from "@/app/dti/TripCompanionView";

interface TripViewProps {
    trip: TripCompanionView;
}
const TripView = (p: TripViewProps) => {
    const trip = p.trip
    return (<>
        <h3>Информация о поездке {trip.id}</h3>
        <br/>
        {trip.startDateTimeGMT.toDateString()}<br/>
        Отправление: {trip.from}<br/>
        Пункт назначения: {trip.to}<br/>
        Стоимость: {trip.price} {trip.currency}<br/>
        <br/>
        Водитель : {trip.driverName}<br/>
        {trip.description}<br/>
        <Button>Забронировать место(Написать водителю)</Button>
    </>)
}

export default TripView;