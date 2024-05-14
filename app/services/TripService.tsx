import {TripCompanionView} from "@/app/dti/TripCompanionView";

export default function useTripGetService() {
    return (id: string) => {
        const fakeTrip: TripCompanionView = {
            description: "Only 2 seats",
            driverName: "Andrei",
            id: id,
            currency: 'BYN',
            from: "Minsk",
            to: "Warsaw",
            startDateTimeGMT: new Date(),
            price: 100,
        }
        return fakeTrip
    }
}