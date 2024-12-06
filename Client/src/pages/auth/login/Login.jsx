import { Box, Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import FixedHeightTextField from '~/components/MuiCustom/FixedHeightTextField'
import { loginApi } from './service'
import { useDispatch } from 'react-redux'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'

export default function Login() {
    const dispatch = useDispatch()

    const [error, setError] = useState(true)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!error) {
            dispatch(setLoading())
            const user = {
                email,
                password
            }

            const res = await loginApi(user)
            console.log("Res: " + res)
            dispatch(clearLoading())

            if (res.success) {
                const dataPopup = {
                    type: 'success',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            } else {
                if (res.errors) {
                    setErrorEmail(res.errors.email)
                    setErrorPassword(res.errors.password)
                }
                const dataPopup = {
                    type: 'error',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
            }
        }
    }

    useEffect(() => {
        // email
        if (email === "" || email.trim() === "") {
            setErrorEmail("Email is required")
        } else {
            setErrorEmail("")
        }

        // password
        if (password === "" || password.trim() === "") {
            setErrorPassword("Password is required")
        } else {
            setErrorPassword("")
        }
    }, [email, password])

    useEffect(() => {
        if (errorEmail || errorPassword) {
            setError(true)
        } else {
            setError(false)
        }
    }, [errorEmail, errorPassword])

    return (
        <>
            {/* Head */}
            <Helmet>
                <title>Login</title>
            </Helmet>

            {/* Body */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                padding: '40px 20px',
                backgroundImage: "url('/images/bg/bgauth.png')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <Box sx={{
                    width: '100%',
                    maxWidth: '500px',
                    borderRadius: '10px',
                    padding: '30px 20px',
                    bgcolor: '#fff',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <Box sx={{
                        width: '100%',
                        mb: 2
                    }}>
                        <Typography sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#000',
                            mb: 1
                        }}>
                            Login
                        </Typography>
                        <Typography sx={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            Sign in with your account
                        </Typography>
                    </Box>
                    <form onSubmit={handleLogin}>
                        <FixedHeightTextField
                            fullWidth
                            type="text"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            autoComplete='off'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            helperText={errorEmail}
                            color={errorEmail ? 'error' : 'success'}
                        />
                        <FixedHeightTextField
                            fullWidth
                            type="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={errorPassword}
                            color={errorPassword ? 'error' : 'success'}
                        />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mb: 3
                        }}>
                            <Link to="/auth/forgot-password">
                                <Box sx={{
                                    fontSize: '14px',
                                    color: '#666',
                                    "&:hover": {
                                        textDecoration: 'underline'
                                    }
                                }}>
                                    Forgot password?
                                </Box>
                            </Link>
                        </Box>

                        <Button sx={{ textTransform: 'none' }}
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </form>

                    <Divider sx={{ mt: 2, color: '#666' }}>Or</Divider>

                    <Box sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#666',
                        fontSize: '14px'
                    }}>
                        Don't have an account?
                        <Link to="/auth/register" style={{ marginLeft: '4px' }}>
                            <Box sx={{
                                color: 'primary.main',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                                Create Account
                            </Box>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
