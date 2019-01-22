require('dotenv').config();
const express = require('express');
const overwatch = require('overwatch-api');
const db = require('./data');

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api', (req, res) => {
    res.send({
        message: 'Welcome to the Over React API!'
    });
});


app.get('/api', (req, res) => {
    res.send({
        message: 'Welcome to the Over React API!'
    });
});

app.get('/api/profile/:userId', (req, res) => {
    console.log(`GET /api/profile/${req.params.userId}`);

    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;

    overwatch.getProfile(platform, region, tag, (err, profileJson) => {
        if (!err) {
            db.addSearch(tag);

            res.send({
                info: profileJson,
                message: 'Got Profile!'
            });
        } else {
            console.log(err);
        }
    });
});

app.get('/api/stats/:userId', (req, res) => {
    console.log(`GET /api/stats/${req.params.userId}`);

    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;

    overwatch.getStats(platform, region, tag, (err, statsJson) => {
        if (!err) {
            res.send({
                stats: statsJson && statsJson.stats,
                combat: statsJson && statsJson.stats && statsJson.stats.combat,
                message: 'Got Stats!'
            });
        } else {
            console.log(err);
        }
    });
});

app.get('/api/stats/:userId/combat', (req, res) => {
    console.log(`GET /api/stats/${req.params.userId}/combat`);

    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;

    overwatch.getStats(platform, region, tag, (statsJson) => {
        res.send({
            stats: statsJson.stats.combat,
            message: 'Got Combat Stats!'
        });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
