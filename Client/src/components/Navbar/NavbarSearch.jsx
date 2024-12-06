import { IconButton, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

export default function NavbarSearch() {
    return (
        <>
            <Tooltip title="Search">
                <IconButton sx={{
                    color: '#333',
                    "&:hover": {
                        color: 'primary.main'
                    }
                }}>
                    <SearchIcon sx={{ fontSize: '25px' }} />
                </IconButton>
            </Tooltip>
        </>
    )
}
