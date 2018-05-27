const passport = require('passport');

module.exports = (app) => {

    app.get('/', (req, res) =>{
        //console.log(req);
        res.send({"hi": "there again"});
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
