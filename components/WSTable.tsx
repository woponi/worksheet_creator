import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, {forwardRef} from "react";

interface WSTableProps {
    totalHours?: string, timeStart?: string,
    timeEnd?: string,
    month?: number,
    desc?: number,
    data?: any
}

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getCurrentMonthDates = (month: number) => {
    const currentDate = new Date();
    const currentMonth = month;
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(new Date(currentYear, currentMonth, i));
    }
    return dates;
};

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Hong_Kong',
        day: 'numeric',
    }).format(date);
};

const formatDayOfWeek = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Hong_Kong',
        weekday: 'long',
    }).format(date);
};

const WSTable : React.FC <WSTableProps> = (
    {
        totalHours = '9',
        timeStart = '9:00',
        timeEnd = '18:00',
        month = 1,
        desc = '',
        data: data
    }) => {

    console.log("data updated", !data && data)
    const dates = getCurrentMonthDates(month);
    //const [totalHours, setTotalHours] = React.useState(0);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Date ({month})</TableCell>
                    <TableCell>Time Start</TableCell>
                    <TableCell>Time End</TableCell>
                    <TableCell>Total Hours</TableCell>
                    <TableCell>Job Description</TableCell>
                    <TableCell>Remark (e.g. Leave)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {dates.map((date) => {
                    let hoilday = (formatDayOfWeek(date) === 'Saturday' || formatDayOfWeek(date) === 'Sunday');
                    return (
                        <TableRow key={date.toString()}>
                            <TableCell>{formatDate(date)}</TableCell>
                            <TableCell>{!hoilday && timeStart}</TableCell>
                            <TableCell>{!hoilday && timeEnd}</TableCell>
                            <TableCell>{!hoilday && totalHours}</TableCell>
                            <TableCell>{data[0]['dtstart']}</TableCell>
                            <TableCell>{hoilday && formatDayOfWeek(date)}</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default WSTable;