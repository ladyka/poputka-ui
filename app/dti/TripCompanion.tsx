import {Dayjs} from "dayjs";

export interface TripCompanion {
    id: string;
    from: string;
    to: string;
    date: Dayjs;
    time: Dayjs;
    price: number;
    currency: string;
    car: string;
    description: string;
    passengers: number;
    driverName: string;
}