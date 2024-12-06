import { Box } from '@mui/material'
import React from 'react'
import Footer from '~/components/Footer/Footer'
import Navbar from '~/components/Navbar/Navbar'

export default function DefaultLayout({ children }) {
    return (
        <Box sx={{ width: '100%' }}>
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <Box sx={{
                width: '100%',
                backgroundColor: '#f6f6f6',
                zIndex: 1
            }}>
                {children}
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    )
}
