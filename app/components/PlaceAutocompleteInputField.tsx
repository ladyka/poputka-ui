import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import { debounce } from "@mui/material/utils";
import { Place } from "@/app/dti/place";

interface PlaceInputFieldProps {
    place: Place;
    setPlace: (p: Place) => void;
    labelText: string;
}

const lang = navigator.languages?.[0] || navigator.language || "ru";

export default function PlaceAutocompleteInputField({
    place,
    setPlace,
    labelText,
}: PlaceInputFieldProps) {
    const [options, setOptions] = React.useState<Place[]>([]);
    const [loading, setLoading] = React.useState(false);
    const fetchCities = React.useCallback(async (inputValue: string) => {
        try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `city=${encodeURIComponent(inputValue)}` +
            `&format=json&addressdetails=1&limit=10` +
            `&accept-language=${lang}`
        );
        const data = await response.json();
        const cityOptions: Place[] = data.map((item: any) => ({
            name: item.name,
            displayName: item.display_name,
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
            id: item.place_id.toString(),
            osm_id: item.osm_id,
            osm_type: item.osm_type
        }));
            setOptions(cityOptions);
        } catch (error) {
            setOptions([]);
        } finally {
            setLoading(false); 
        }
    }, []);

    const debouncedFetch = React.useMemo(
        () => debounce((value: string) => {
            fetchCities(value);
        }, 500),
    [fetchCities]);

    const handleInputChange = React.useCallback(
        (_: React.SyntheticEvent, newValue: string) => {
            if (newValue.length < 3) {
                debouncedFetch.clear();
                setLoading(false);
                setOptions([]);
            } else {
                setLoading(true);
                setOptions([]);
                debouncedFetch(newValue);
            }
        },
        [debouncedFetch]
    );

    return (
        <Autocomplete
            value={place}
            onChange={(_, newValue) => {
                if (newValue) {
                    setPlace(newValue);
                } else {
                    setPlace({
                        name: "",
                        displayName: "",
                        latitude: 0,
                        longitude: 0,
                        id: "",
                        osm_id: -1,
                        osm_type: "",
                    });
                }
            }}
            onInputChange={handleInputChange}
            options={options}
            loading={loading}
            loadingText="Загружаем…"
            noOptionsText={loading ? "" : "пустой"}
            getOptionLabel={(option) => option.displayName}
            filterOptions={(opts) => opts}
            renderInput={(params) => <TextField {...params} label={labelText} fullWidth />}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.displayName}
                </li>
            )}
        />
    );
}
