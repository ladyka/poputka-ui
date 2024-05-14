'use client'

import useTripGetService from "../../app/services/TripService";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TripView from "@/app/trip/TripView";


export default function TripPage() {
    const tripId = "someTripId"
    let tripGetService = useTripGetService()
    let trip: TripCompanionView = tripGetService(tripId);
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <TripView trip={trip}/>
        </ThemeProvider>
    );
}

