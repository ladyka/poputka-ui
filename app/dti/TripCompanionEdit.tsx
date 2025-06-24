import {Dayjs} from "dayjs";

export interface TripCompanionEdit {
    id: number;
    from: {
        name: string;
        osm_id: number;
        osm_type: string;
    },
    to: {
        name: string;
        osm_id: number;
        osm_type: string;
    },
    start: Dayjs;
    // price: number;
    // currency: string;
    description: string;
    passengers: number;
}