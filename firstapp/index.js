const express = require('express');
const passport = require('passport');
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;

const app = express();

const services = xsenv.getServices({uaa: 'nodeuaa'});

passport.use(new JWTStrategy(services.uaa));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', {session: false}));

app.get('/', (req, res) => {
    res.send('Logged user: ' + req.user.id);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("App is listening on PORT: " + port);
})