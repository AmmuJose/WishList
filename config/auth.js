var ids = {
    facebook: {
        profileFields: ['id', 'emails', 'name'],
        clientID: '',
        clientSecret: '',
        callbackURL: 'https://wish-list-nj.herokuapp.com/auth/facebook/callback',
    },

    github: {
        scope: 'user:email',
        clientID: '',
        clientSecret: '',
        //callbackURL: 'http://localhost:8080/auth/github/callback'
        callbackURL: 'https://wish-list-nj.herokuapp.com/auth/github/callback'
    },

}

module.exports = ids;