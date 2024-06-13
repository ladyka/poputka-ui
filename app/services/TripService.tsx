import {TripCompanion} from "@/app/dti/TripCompanion";
import dayjs from "dayjs";
import {apiInstance} from "@/app/services/ApiInstance";

export default function useTripGetService() {
    return (id: string) => {
        const fakeTrip: TripCompanion = {
            date: dayjs(),
            passengers: 2,
            time: dayjs(),
            car: "Honda",
            description: "Only 2 seats",
            driverName: "Andrei",
            id: id,
            currency: 'BYN',
            from: "Minsk",
            to: "Warsaw",
            price: 100
        }
        return fakeTrip
    }
}

export function useTripEditService() {
    return (trip: TripCompanion) => {
        return apiInstance.post('/trip/', trip)
    }
}