import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {forwardRef} from "react";

interface WSTableProps {
    totalHours?: string,
    timeStart?: string,
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

const WSTable: React.FC<WSTableProps> = (
    {
        totalHours = '9',
        timeStart = '9:00',
        timeEnd = '18:00',
        month = 1,
        desc = '',
        data: data
    }) => {

    console.log("data updated", data[0]['dtstart'][0])
    let holidays: any[] = [];

    for (let i = 0; i < data.length; i++) {
        let date = data[i]['dtstart'][0];
        let holiday: {} = {
            date: `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6, 8)}`,
            name: data[i]['summary']
        }
        holidays.push(holiday);
    }

    const dates = getCurrentMonthDates(month);
    //const [totalHours, setTotalHours] = React.useState(0);

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
                    {[...Array(31)].map((e, i) => {
                        if (dates[i] !== undefined) {
                            const date = dates[i]
                            //let isoDateString = date.toLocaleDateString('en-US', { timeZone: 'Asia/Hong_Kong' }).slice(0, 10);
                            const month = date.getMonth() + 1;
                            const day = date.getDate();
                            const year = date.getFullYear();
                            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                            const matchHoliday = isHoliday(formattedDate, holidays);

                            let weekend = (formatDayOfWeek(date) === 'Saturday' || formatDayOfWeek(date) === 'Sunday');
                            return <>

                                <TableRow key={date.toString()}>
                                    <TableCell>{formatDate(date)}</TableCell>
                                    {
                                        (!matchHoliday) ? <>
                                                <TableCell>{!weekend && timeStart}</TableCell>
                                                <TableCell>{!weekend && timeEnd}</TableCell>
                                                <TableCell>{!weekend && totalHours}</TableCell>
                                                <TableCell colSpan={2}></TableCell>
                                                <TableCell>{weekend && formatDayOfWeek(date)}</TableCell>
                                            </> :
                                            <>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell colSpan={2}></TableCell>
                                                <TableCell>{matchHoliday['name']}</TableCell>
                                            </>

                                    }
                                </TableRow>

                            </>
                        } else {
                            return <>

                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    {
                                        <>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell colSpan={2}></TableCell>
                                            <TableCell></TableCell>
                                        </>
                                    }
                                </TableRow>

                            </>
                        }

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