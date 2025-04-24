import React, {useRef} from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';
import {Box, Grid} from '@mui/material';

interface CopyHTMLButtonProps {
    componentToCopy: React.ReactNode;
}

const CopyHTMLButton: React.FC<CopyHTMLButtonProps> = ({componentToCopy}) => {
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
                    <Grid item xs={12} direction="column" sx={{textAlign: "center"}}>
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
        </>
    );
}

export default CopyHTMLButton;
