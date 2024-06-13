import {TripCompanion} from "@/app/dti/TripCompanion";

interface TripViewProps {
    trip: TripCompanion;
}

const TripView = ({trip}: TripViewProps) => {
    return (<>
        <h3>Информация о поездке {trip.id}</h3>
        <br/>
        Отправление: {trip.from}<br/>
        Пункт назначения: {trip.to}<br/>
        Стоимость: {trip.price} {trip.currency}<br/>
        <br/>
        Дата отправления {trip.date.toString()}<br/>
        Время отправления {trip.time.toJSON()}<br/>
        Пассажиры {trip.passengers}<br/>
        Комментарии {trip.description}<br/>
        Водитель : {trip.driverName}<br/>
        {/*<Button>Забронировать место(Написать водителю)</Button>*/}
    </>)
}

export default TripView;