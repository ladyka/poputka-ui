import {Dayjs} from "dayjs";

export interface TripCompanionEdit {
    id: number;
    from: string;
    to: string;
    start: Dayjs;
    price: number;
    currency: string;
    car: string;
    description: string;
    passengers: number;
}