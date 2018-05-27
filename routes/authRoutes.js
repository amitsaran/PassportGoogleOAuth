const passport = require('passport');

module.exports = (app) => {

    app.get('/', (req, res) =>{
        //console.log(req);
        res.send({"message": "Hello there, use the URL: https://thawing-meadow-49285.herokuapp.com/auth/google to authenticate yourself using google oauth"});
    });

    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google', { 
            successRedirect: '/api/current_user',
            failureRedirect: '/' 
        })
    );
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
