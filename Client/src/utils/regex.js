const regex = {
    fullName: {
        pattern: /^(?!\s)[a-zA-Z\u0080-\uFFFF\s]{2,50}(?<!\s)$/,
        message: 'Full name must be between 2 and 50 characters and not contain any special characters'
    },
    email: {
        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email address'
    },
    password: {
        pattern: /^.{6,30}$/,
        message: 'Password must be between 6 and 30 characters'
    }
}

export default regex