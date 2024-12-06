import { Box } from '@mui/material'
import React from 'react'

export default function NotFound() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            userSelect: 'none',
            padding: '0px 20px',
            textAlign: 'center',
            padding: '60px 0px 100px 0px'
        }}>
            <Box sx={{
                fontWeight: 700,
                color: 'error.main',
                fontSize: '100px'
            }}>
                404
            </Box>
            <Box sx={{
                color: '#000',
                fontWeight: 600,
                fontSize: '25px'
            }}>
                Oops! Page not found
            </Box>
            <Box sx={{
                mt: 3,
                color: '#000',
                fontWeight: 400,
                fontSize: '15px'
            }}>
                Sorry, this page does not exist or has been deleted.
            </Box>
        </Box>
    )
}
