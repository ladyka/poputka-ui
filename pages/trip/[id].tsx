import { useRouter } from 'next/router';
import useTripGetService from "@/app/services/TripService";
import {TripCompanionView} from "@/app/dti/TripCompanionView";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TripView from "@/app/trip/TripView";


const TripIdPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const tripId = typeof id === 'string' ? id : ''
    let tripGetService = useTripGetService()
    let trip: TripCompanionView = tripGetService(tripId);
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <TripView trip={trip}/>
        </ThemeProvider>
    );
};

export default TripIdPage;

