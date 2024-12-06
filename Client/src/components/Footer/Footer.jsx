import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <Box sx={{
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
            boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.05)'
        }}>
            <Container sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                justifyContent: 'space-between',
                paddingTop: '30px',
                paddingBottom: '30px',
                gap: '50px'
            }}>
                {/* Left */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '10px'
                }}>
                    <Typography sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'primary.main',
                        borderBottom: '2px solid #000',
                        borderColor: 'primary.main',
                        paddingBottom: '10px',
                        marginBottom: '10px'
                    }}>
                        Introduce
                    </Typography>
                    <Typography sx={{
                        fontSize: '15px',
                        color: '#000'
                    }}>
                        Welcome to the website (in this project), this is a sales website using modern and new technologies including Reactjs, the server side uses ASP.Net Api and SQL Server is used as the database.
                    </Typography>
                </Box>

                {/* Center */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '10px'
                }}>
                    <Typography sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'primary.main',
                        borderBottom: '2px solid #000',
                        borderColor: 'primary.main',
                        paddingBottom: '10px',
                        marginBottom: '10px'
                    }}>
                        Contact
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        color: '#000'
                    }}>
                        <Typography sx={{
                            fontSize: '15px',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '20px' }}>
                                <i className="bi bi-crosshair"></i>
                            </span>
                            <span>
                                62 Đường 36, Khu đô Thị Vạn Phúc, Thủ Đức, Hồ Chí Minh 71300, Việt Nam
                            </span>
                        </Typography>
                        <Typography sx={{
                            fontSize: '15px',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '20px' }}>
                                <i className="bi bi-envelope-at"></i>
                            </span>
                            <Link to={'mailto:aptech.fpt@fe.edu.vn'} style={{
                                color: '#000',
                                textDecoration: 'underline'
                            }}>
                                aptech.fpt@fe.edu.vn 
                            </Link>
                        </Typography>
                        <Typography sx={{
                            fontSize: '15px',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '20px' }}>
                                <i className="bi bi-telephone"></i>
                            </span>
                            <span>
                                (+84) 332 290 799
                            </span>
                        </Typography>
                    </Box>
                </Box>

                {/* Right */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '10px'
                }}>
                    <Typography sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'primary.main',
                        borderBottom: '2px solid #000',
                        borderColor: 'primary.main',
                        paddingBottom: '10px',
                        marginBottom: '10px'
                    }}>
                        Map
                    </Typography>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.551751612772!2d106.70944807488341!3d10.845574789307395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529564f2b4679%3A0x92c1b5bfdc78c98!2zRlBUIEFwdGVjaCBW4bqhbiBQaMO6Yw!5e0!3m2!1svi!2s!4v1732311938636!5m2!1svi!2s"
                        width="auto"
                        height="300"
                        loading="lazy"
                        style={{
                            border: 'none',
                            borderRadius: '5px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                        }}
                    ></iframe>
                </Box>
            </Container>
            <Container sx={{
                display: 'flex',
                width: '100%',
                fontSize: '14px',
                fontWeight: 500,
                paddingTop: '20px',
                paddingBottom: '20px',
            }}>
                &copy; All Rights Reserved By
                <Typography sx={{
                    marginLeft: '6px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: 'primary.main'
                }}>
                    {import.meta.env.VITE_PROJECT_NAME}
                </Typography>
            </Container>
        </Box>
    )
}
