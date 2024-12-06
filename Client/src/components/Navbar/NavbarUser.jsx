import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function NavbarUser() {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <Tooltip title="Login or Create Account">
                <IconButton LinkComponent={Link} to='/auth/login' sx={{
                    color: '#333',
                    "&:hover": {
                        color: 'primary.main'
                    }
                }}>
                    <AccountCircleIcon sx={{ fontSize: '25px' }} />
                </IconButton>
            </Tooltip>
        </Box>
    )
}
