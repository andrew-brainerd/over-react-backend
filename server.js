require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const overwatch = require('overwatch-api');

const app = express();
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', (req, res) => {
    res.send({
        message: 'Welcome to the Over React API!'
    });
});

app.get('/api/profile/:userId', (req, res) => {
    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;

    overwatch.getProfile(platform, region, tag, (profileJson) => {
        res.send({
            info: profileJson,
            message: 'Got Profile!'
        });
    });
});

app.get('/api/stats/:userId', (req, res) => {
    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;

    overwatch.getStats(platform, region, tag, (statsJson) => {
        res.send({
            username: statsJson.username,
            level: statsJson.level,
            portrait: statsJson.portrait,
            stats: statsJson.stats,
            message: 'Got Stats!'
        });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
