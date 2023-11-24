import { useState, useEffect, useCallback } from 'react';
import { TextField, Box, Button, Typography, Container, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from 'buffer';

import DisplayImage from './DisplayImage';

import query from '../query.mjs'

let dataArray = ['', '', '', '', '', '', '', '', '', '', ''];
let urlArray = ['', '', '', '', '', '', '', '', '', '', ''];


export default function FullWidthTextField() {
    const [currentData, setCurrentData] = useState('')
    const [data, setData] = useState(dataArray)
    const [counter, setCounter] = useState(0);
    const [displayOutput, setDisplayOutput] = useState(false)
    const [url, setUrl] = useState(urlArray)
    const [imageUrl, setImageUrl] = useState('')
    
    const updateCurrentData = (e) => {
        setCurrentData(e.target.value);
    }

    const updateDataNext = async () => {
        let currentCounter = counter;
        dataArray[counter] = currentData;
        setData(dataArray);
        setCurrentData(dataArray[currentCounter + 1]);
        console.log(data);
        setCounter(counter + 1);
        let queryData = { "inputs": dataArray[currentCounter] }
        const res = await query(queryData);
        const imageBytes = Buffer.from(res, 'binary').toString('base64');
        const iU = 'data:image/png;base64,' + imageBytes;
        urlArray[currentCounter] = iU;
        setImageUrl(iU);
        // console.log(iU);
        // console.log(imageUrl);
        // console.log(urlArray);
    }
    const updateDataPrev = () => {
        let currentCounter = counter;
        dataArray[counter] = currentData;
        setCounter(counter - 1);
        setData(dataArray);
        setCurrentData(dataArray[currentCounter - 1]);
        console.log(data);
    }
    const showOutput = useCallback(() => {
        setDisplayOutput(true);
    }, [data])

    useEffect(() => {
        if (counter === 10) {
            showOutput();
        }
        // console.log('data changed')

    }, [data, counter, showOutput])

    // console.log(urlArray);
    return (
        <>
            {counter < 10 && (
                <Box
                    sx={{
                        width: '90%',
                        my: 3,
                        mx: '5%'
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>Enter text promt for page {counter + 1}</Typography>
                    <TextField
                        sx={{
                            my: 3,
                        }}
                        fullWidth label="Enter text promt here..." id="fullWidth" value={currentData} onChange={updateCurrentData} />
                </Box>
            )}
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {(counter > 0 && counter < 10) && (
                    <Button
                        sx={{
                            mx: 3,
                            my: 3
                        }}
                        variant="contained" startIcon={<SkipPreviousIcon />} onClick={updateDataPrev}>
                        Prev Page
                    </Button>
                )}
                {counter < 9 && (
                    <Button
                        sx={{
                            mx: 3,
                            my: 3
                        }}
                        variant="contained" endIcon={<SkipNextIcon />} onClick={updateDataNext}>
                        Next Page
                    </Button>
                )}
                {counter === 9 && (
                    <Button
                        sx={{
                            mx: 3,
                            my: 3
                        }}
                        variant="contained" endIcon={<SendIcon />} onClick={updateDataNext}>
                        Generate
                    </Button>
                )}
                {counter === 10 && (
                    <Button
                        sx={{
                            mx: 3,
                            my: 3
                        }}
                        variant="contained" endIcon={<EditIcon />} onClick={updateDataPrev}>
                        Modify
                    </Button>
                )}
            </Container>
            {displayOutput === true && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '90%',
                            mx: '5%'
                        }}
                    >
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item>
                                <DisplayImage iurl={urlArray[0]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[1]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[2]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[3]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[4]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[5]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[6]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[7]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[8]} />
                            </Grid>
                            <Grid item>
                                <DisplayImage iurl={urlArray[9]} />
                            </Grid>
                        </Grid>
                    </Box>

                </>
            )}
        </>
    );
}