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