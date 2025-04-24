import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {forwardRef} from "react";

interface WSTableProps {
    totalHours?: string,
    timeStart?: string,
    timeEnd?: string,
    data?: any,
    startDate: Date,
    endDate: Date
}

const getDateRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
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

const WSTable: React.FC<WSTableProps> = (
    {
        totalHours = '9',
        timeStart = '9:00',
        timeEnd = '18:00',
        data = [],
        startDate,
        endDate
    }) => {

    let holidays: any[] = [];

    for (let i = 0; i < data.length; i++) {
        let date = data[i]['dtstart'][0];
        let holiday: {} = {
            date: `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`,
            name: data[i]['summary']
        }
        holidays.push(holiday);
    }

    const dates = getDateRange(startDate, endDate);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time Start</TableCell>
                        <TableCell>Time End</TableCell>
                        <TableCell>Total Hours</TableCell>
                        <TableCell colSpan={2}>Job Description</TableCell>
                        <TableCell>Remark (e.g. Leave)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dates.map((date) => {
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const year = date.getFullYear();
                        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                        const matchHoliday = isHoliday(formattedDate, holidays);
                        let weekend = (formatDayOfWeek(date) === 'Saturday' || formatDayOfWeek(date) === 'Sunday');

                        return (
                            <TableRow key={date.toString()}>
                                <TableCell>{formatDate(date)}</TableCell>
                                {!matchHoliday ? (
                                    <>
                                        <TableCell>{!weekend && timeStart}</TableCell>
                                        <TableCell>{!weekend && timeEnd}</TableCell>
                                        <TableCell>{!weekend && totalHours}</TableCell>
                                        <TableCell colSpan={2}></TableCell>
                                        <TableCell>{weekend && formatDayOfWeek(date)}</TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell colSpan={2}></TableCell>
                                        <TableCell>{matchHoliday['name']}</TableCell>
                                    </>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function isHoliday(dateString: string, holidayList: any[]) {
    const matchingHoliday = holidayList.find(holiday => holiday['date'] === dateString);
    return matchingHoliday || false;
}

export default WSTable;