import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";


export default function Header() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#D27D2D' }} color={"transparent"}>
                <Toolbar>
                    <Typography
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        style={{
                            color : 'white',
                            fontFamily : 'Trebuchet MS',
                            fontSize: "x-large",
                            fontWeight: 'bold'
                        }}
                    >
                        IITM BSc Course Review Portal
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
