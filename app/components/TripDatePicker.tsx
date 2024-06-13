import {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import * as React from "react";

interface TripDatePickerProps {
    date: Dayjs | null,
    setDate: any,
    label: string
}

export default function TripDatePicker({date, setDate, label}: TripDatePickerProps) {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={label}
            value={date}
            onChange={(newDate) => setDate(newDate)}
            disablePast

        />
    </LocalizationProvider>)
}