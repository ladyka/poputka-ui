import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import {Place} from "@/app/dti/place";

interface PlaceInputFieldProps {
    place: Place;
    setPlace: (p: Place) => void;
    labelText: string;
}

export default function PlaceAutocompleteInputField({place, setPlace, labelText}: PlaceInputFieldProps) {
    const [options, setOptions] = React.useState<Place[]>([]);
    const [loading, setLoading] = React.useState(false);

    const fetchCities = async (inputValue: string) => {
        if (inputValue.length < 3) {
            setOptions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${inputValue}&format=json&addressdetails=1&limit=10`);
            const data = await response.json();
            const cityOptions = data.map((item: any) => {
                debugger;
                return ({
                    name: item.name,
                    displayName: item.display_name,
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                });
            });
            setOptions(cityOptions);
        } catch (error) {
            console.error("Error fetching cities:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Autocomplete
            value={place}
            onChange={(event, newValue, reason, details) => {
                if (newValue) {
                    setPlace(newValue)
                } else {
                    setPlace({
                        name: '',
                        displayName: '',
                        latitude: 0,
                        longitude: 0
                    });
                }
            }}
            onInputChange={(event, newInputValue) => {
                fetchCities(newInputValue);
            }}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.displayName}
            renderInput={(params) => (
                <TextField {...params} label={labelText} fullWidth/>
            )}
            renderOption={(props, option) => (
                <li {...props} key={option.name}>
                    {option.displayName}
                </li>
            )}
        />
    );
}
