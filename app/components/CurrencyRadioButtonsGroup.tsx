import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface CurrencyRadioButtonsGroupProps {
    value: string,
    setValue: any,
    label: string
}

export default function CurrencyRadioButtonsGroup({value, setValue, label}: CurrencyRadioButtonsGroupProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    return (
        <FormControl>
            <FormLabel id="сurrency-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="сurrency-radio-buttons-group-label"
                defaultValue="BYN"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="BYN" control={<Radio/>} label="BYN"/>
                <FormControlLabel value="EUR" control={<Radio/>} label="EUR"/>
                <FormControlLabel value="RUB" control={<Radio/>} label="RUB"/>
                <FormControlLabel value="PLN" control={<Radio/>} label="PLN"/>
            </RadioGroup>
        </FormControl>
    );
}