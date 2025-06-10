import {TripCompanionEdit} from "@/app/dti/TripCompanionEdit";
import {apiInstance} from "@/app/services/ApiInstance";
import { useCallback } from "react";

export default function useTripGetService() {
    return useCallback(async (id: number) => {
        return (await apiInstance.get(`/trip/${id}`)).data;
    }, [])
}

export function useTripEditService() {
    return useCallback((trip: TripCompanionEdit) => {
        return apiInstance.post('/trip/', trip)
    }, [])
}

export function useTripsSearchService() {
    return useCallback((placeFrom: string, placeTo: string) => {
        const request = {
            placeFrom: placeFrom,
            placeTo: placeTo
        }
        return apiInstance.post('/trip/search', request)
    }, [])
}


export function usePopularRoutesService() {
    return useCallback(() => {
        return apiInstance.get('/trip/popular')
    }, [])
}

