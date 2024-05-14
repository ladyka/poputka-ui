'use client'

import useTripGetService from "../../app/services/TripService";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import TripView from "@/app/trip/TripView";


export default function TripPage(tripId: string) {
    let tripGetService = useTripGetService()
    let trip: TripCompanionView = tripGetService(tripId);
    return (
        <TripView trip={trip}/>
    );
}

