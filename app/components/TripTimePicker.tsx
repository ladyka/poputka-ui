import {Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import * as React from "react";

interface TripTimePickerProps {
    time: Dayjs | null,
    setTime: any,
    label: string
}

export default function TripTimePicker({time, setTime, label}: TripTimePickerProps) {
    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label={label}
                value={time}
                onChange={setTime}
                ampm={false}
            />
        </LocalizationProvider>
    )
}