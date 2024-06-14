import {Dayjs} from "dayjs";

export interface TripCompanion {
    id: number;
    from: string;
    to: string;
    start: Dayjs;
    price: number;
    currency: string;
    car: string;
    description: string;
    passengers: number;
    driverName: string;
}