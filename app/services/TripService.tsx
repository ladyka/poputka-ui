import {TripCompanion} from "@/app/dti/TripCompanion";
import {apiInstance} from "@/app/services/ApiInstance";

export default function useTripGetService() {
    return async (id: number) => {
        return (await apiInstance.get(`/trip/${id}`)).data;
    }
}

export function useTripEditService() {
    return (trip: TripCompanion) => {
        return apiInstance.post('/trip/', trip)
    }
}

export function useTripsSearchService() {
    return (placeFrom: string, placeTo: string) => {
        const request = {
            placeFrom: placeFrom,
            placeTo: placeTo
        }
        return apiInstance.post('/trip/search', request)
    }
}

