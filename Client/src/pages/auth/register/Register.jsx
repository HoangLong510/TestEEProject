import { Box, Button, Divider, InputAdornment, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FixedHeightTextField from '~/components/MuiCustom/FixedHeightTextField'
import { setPopup } from '~/libs/features/popup/popupSlice'
import { registerApi } from './service'
import regex from '~/utils/regex'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { clearLoading, setLoading } from '~/libs/features/loading/loadingSlice'

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState(true)

    const [errorFullName, setErrorFullName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()

        if (!error) {
            dispatch(setLoading())
            const user = {
                fullName,
                email,
                password,
                confirmPassword
            }

            const res = await registerApi(user)
            dispatch(clearLoading())

            if (res.success) {
                const dataPopup = {
                    type: 'success',
                    message: res.message
                }
                dispatch(setPopup(dataPopup))
                navigate('/auth/login')
            } else {
                if (res.errors) {
                    setErrorFullName(res.errors.fullName)
                    setErrorEmail(res.errors.email)
                    setErrorPassword(res.errors.password)
                    setErrorConfirmPassword(res.errors.confirmPassword)
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
        // Full name
        if (fullName === "" || fullName.trim() === "") {
            setErrorFullName("Full name is required")
        } else if (!regex.fullName.pattern.test(fullName)) {
            setErrorFullName(regex.fullName.message)
        } else {
            setErrorFullName("")
        }

        // email
        if (email === "" || email.trim() === "") {
            setErrorEmail("Email is required")
        } else if (!regex.email.pattern.test(email)) {
            setErrorEmail(regex.email.message)
        } else {
            setErrorEmail("")
        }

        // password
        if (password === "" || password.trim() === "") {
            setErrorPassword("Password is required")
        } else if (!regex.password.pattern.test(password)) {
            setErrorPassword(regex.password.message)
        } else {
            setErrorPassword("")
        }

        // confirm password
        if (confirmPassword === "" || confirmPassword.trim() === "") {
            setErrorConfirmPassword("Confirm password is required")
        } else if (confirmPassword !== password) {
            setErrorConfirmPassword("Confirm password and password does not match")
        } else {
            setErrorConfirmPassword("")
        }
    }, [fullName, email, password, confirmPassword])

    useEffect(() => {
        if (errorFullName || errorEmail || errorPassword || errorConfirmPassword) {
            setError(true)
        } else {
            setError(false)
        }
    }, [errorFullName, errorEmail, errorPassword, errorConfirmPassword])

    return (
        <>
            {/* Head */}
            <Helmet>
                <title>Register</title>
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
                    maxWidth: '550px',
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
                            Register
                        </Typography>
                        <Typography sx={{
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            Create your new account
                        </Typography>
                    </Box>

                    <form onSubmit={handleRegister}>
                        {/* Full name */}
                        <FixedHeightTextField
                            fullWidth
                            type="text"
                            label="Full name"
                            variant="outlined"
                            margin="normal"
                            autoComplete='off'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            helperText={errorFullName}
                            color={errorFullName ? 'error' : 'success'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" style={{ cursor: 'default' }}>
                                        {!errorFullName && (
                                            <CheckCircleIcon color="success" />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Email */}
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" style={{ cursor: 'default' }}>
                                        {!errorEmail && (
                                            <CheckCircleIcon color="success" />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Password */}
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" style={{ cursor: 'default' }}>
                                        {!errorPassword && (
                                            <CheckCircleIcon color="success" />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Confirm password */}
                        <FixedHeightTextField
                            fullWidth
                            type="password"
                            label="Confirm password"
                            variant="outlined"
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            helperText={errorConfirmPassword}
                            color={errorConfirmPassword ? 'error' : 'success'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" style={{ cursor: 'default' }}>
                                        {!errorConfirmPassword && (
                                            <CheckCircleIcon color="success" />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button sx={{ textTransform: 'none', mt: 2 }}
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Create account
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
                        You already have an account?
                        <Link to="/auth/login" style={{ marginLeft: '4px' }}>
                            <Box sx={{
                                color: 'primary.main',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                                Login
                            </Box>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
