import { Box, Container, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import NavbarUser from './NavbarUser'
import NavbarSearch from './NavbarSearch'
import NavbarMenu from './NavbarMenu'
import menuItems from './menuItems'
import { useSelector } from 'react-redux'

export default function Navbar() {

    const loading = useSelector(state => state.loading.value)

    return (
        <Box sx={{
            position: 'sticky',
            top: 0,
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)'
        }}>
            {loading && (
                <Box sx={{
                    position: 'fixed',
                    width: '100%'
                }}>
                    <LinearProgress />
                </Box>
            )}
            <Container sx={{
                height: '100%',
                display: 'flex',
                height: '60px',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px'
            }}>
                {/* Left */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    height: '100%',
                    paddingLeft: '10px',
                }}>
                    <Link to={'/'} style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src='/images/logo/logo.png'
                            width={'54'}
                            height={'40'}
                            alt='logo'
                        />
                    </Link>

                    {/* MenuItems */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: '30px',
                        height: '100%',
                    }}>
                        {menuItems.map((menuItem, index) => {
                            return (
                                <Link
                                    to={menuItem.href}
                                    key={index}
                                    target={menuItem.label === 'Fanpage' ? '_blank' : '_self'}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '100%'
                                    }}>
                                    <Typography sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        textTransform: 'capitalize',
                                        border: '2px solid #fff',
                                        color: '#333',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            color: 'primary.main',
                                            borderBottomColor: 'primary.main'
                                        }
                                    }}>
                                        {menuItem.label}
                                    </Typography>
                                </Link>
                            )
                        })}
                    </Box>
                </Box>

                {/* Right */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <NavbarSearch />

                    <NavbarUser />

                    <NavbarMenu />
                </Box>
            </Container>
        </Box>
    )
}
