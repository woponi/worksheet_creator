import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, {useState, useEffect, useRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {alpha, createTheme, styled} from '@mui/material/styles';
import WSTable from '../../components/WSTable';
import {GetStaticProps} from 'next';
import CopyButton from '../../components/CopyButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReactGA from "react-ga4";

import { useRouter } from 'next/router';


// Create a react input component that accepts a column to enter the month and year and displays the dates of the month in a table.
interface HomeProps {
    initialData: any; // Change "any" to the type of your data
}


const Home: React.FC<HomeProps> = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const [data, setData] = useState(null);
    const [curMonth, setCurMonth] = useState(currentMonth);
    const [inputValue, setInputValue] = useState(currentMonth + 1);

    const tableRef = useRef<HTMLDivElement>(null);

    const router = useRouter();


    ReactGA.initialize("G-MQ19L50V11");
    ReactGA.send({ hitType: "pageview", page: router.pathname, title: "Stupid timesheet" });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(event.target.value));
        setCurMonth(Number(event.target.value) - 1);
    };

    const handleButtonClick = () => {
        // Call API or perform other action here
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://proxy.vfpoc.cc/https://www.1823.gov.hk/common/ical/en.json');
                const data = await response.json();
                console.log('data = ', data);
                setData(data.vcalendar[0].vevent);
            } catch (e) {
                console.log('error = ', e);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Stupid Timesheet for HKG</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <Typography variant="h3" gutterBottom>
                    VF Timesheet generator for HKG
                </Typography>
                <Typography variant="h6" gutterBottom>
                    How to use:<br/>
                    1. Change the month if not for the current month<br/>
                    2. Click the Copy button and paste it to the timesheet date header<br/>
                </Typography>
                {data ?
                    <>
                        <CopyButton
                            inputValue={inputValue}
                            handleInputChange={handleInputChange}
                            componentToCopy={<WSTable month={curMonth} desc={inputValue} data={data}/>}/>
                    </>
                    :
                    <p>Loading data...</p>
                }
                <div className={styles.grid}>

                </div>
                
                <footer className={styles.footer}>
                    Powered by <a target={'_blank'} href={'https://github.com/woponi/worksheet_creator/'}>Pong Github</a> <br/>HK Public holiday data from <a href="https://www.1823.gov.hk/common/ical/en.json" target="_blank">1823.gov.hk</a>
                </footer>
            </main>
        </>
    )
}


export default Home