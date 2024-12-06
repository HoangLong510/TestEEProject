import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import menuItems from './menuItems'
import { Link } from 'react-router-dom'

export default function NavbarMenu() {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {/* Button open menu */}
            <Tooltip title="Menu">
                <IconButton onClick={toggleDrawer(true)} sx={{
                    color: '#333',
                    "&:hover": {
                        color: 'primary.main'
                    }
                }}>
                    <MenuIcon sx={{ fontSize: '25px' }} />
                </IconButton>
            </Tooltip>
            
            {/* Menu */}
            <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
                <Box sx={{ width: 250 }} role="presentation">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0px 20px',
                        height: '60px',
                        userSelect: 'none'
                    }}>
                        <Box sx={{
                            gap: '4px',
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}>
                            <Typography sx={{
                                display: 'flex',
                                color: '#000',
                                fontSize: '13px',
                                fontWeight: 400
                            }}>
                                Welcome to
                            </Typography>
                            <Typography sx={{
                                display: 'flex',
                                color: 'primary.main',
                                fontSize: '13px',
                                fontWeight: 600
                            }}>
                                {import.meta.env.VITE_PROJECT_NAME}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    <List onClick={toggleDrawer(false)}>
                        {menuItems.map((menuItem, index) => {
                            const Icon = menuItem.icon
                            return (
                                <ListItem disablePadding key={index}>
                                    <ListItemButton
                                        LinkComponent={Link}
                                        to={menuItem.href}
                                        target={menuItem.label === 'Fanpage' ? '_blank' : '_self'}
                                        sx={{
                                            borderLeft: '3px solid #fff',
                                            '&:hover': {
                                                borderColor: 'primary.main'
                                            }
                                        }}>
                                        <ListItemIcon sx={{ color: '#000' }}>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={menuItem.label}
                                            primaryTypographyProps={{
                                                style: {
                                                    color: '#000',
                                                    fontSize: '15px',
                                                    fontWeight: 400
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>

                    <Divider />
                </Box>
            </Drawer>
        </Box>
    )
}
