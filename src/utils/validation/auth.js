const authConstraints = {
    email: {
        presence : true,
        email    : true
    },
    password: {
        presence : true,
        length   : {
            minimum: 6
        }
    },
    confirmPassword: {
        presence : true,
        length   : {
            minimum: 6
        },
        equality: 'password'
    }
}

export default authConstraints
