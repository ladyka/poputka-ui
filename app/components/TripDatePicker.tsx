import {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import * as React from "react";

interface TripDatePickerProps {
    date: Dayjs | null,
    setDate: any,
    label: string,
    isPast: boolean
}

export default function TripDatePicker({date, setDate, label, isPast}: TripDatePickerProps) {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label={label}
            value={date}
            onChange={(newDate) => setDate(newDate)}
            disablePast={isPast}
            disableFuture={!isPast}

        />
    </LocalizationProvider>)
}