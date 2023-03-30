import React, {useRef} from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import {Box, Grid, TextField} from '@mui/material';

interface CopyHTMLButtonProps {
    inputValue: number;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    componentToCopy: React.ReactNode;
}



const TFstyles = {
    root: {
        '& .MuiInputBase-input': {
            color: 'white', // text color
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white', // border color
            },
            '&:hover fieldset': {
                borderColor: 'white', // hover border color
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white', // focus border color
            },
            backgroundColor: '#fff', // background color
        },
        '& .MuiInputLabel-root': {
        },
            '& .Mui-disabled': {
                color: 'white', // text color
            }
    },
};

const CopyHTMLButton: React.FC<CopyHTMLButtonProps> = ({inputValue, handleInputChange, componentToCopy}) => {
    const componentRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);


    const handleCopyHTML = () => {
        if (componentRef.current) {
            const componentHTML = componentRef.current.innerHTML;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(componentHTML);
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 1000);
            } else {
                alert('Clipboard API not supported');
            }
        }
    };

    return (
        <>
            <Box sx={{width: '100%'}}>
                <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={6} direction="column" sx={{textAlign: "center"}}>
                            <TextField
                                id="outlined-number"
                                label="Current Month"
                                type="number"
                                value={inputValue}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: TFstyles.root,
                                    style: {color: 'white'}
                                }}
                                InputProps={{sx: TFstyles.root}}
                            />
                    </Grid>
                    <Grid item xs={6} direction="column" sx={{textAlign: "center"}}>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied to clipboard!"
                        >

                            <Button variant="contained" onClick={handleCopyHTML}>Copy To Clipboard</Button>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
            <div ref={componentRef}>{componentToCopy}</div>
                    </Grid>
                </Grid>
            </Box>
            <div>
            </div>
        </>
    );
};

export default CopyHTMLButton;
