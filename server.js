require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const overwatch = require('overwatch-api');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/profile/:userId', (req, res) => {
    console.log('GET /api/profile/' + req.params.userId);

    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;
    
    overwatch.getProfile(platform, region, tag, (profileJson) => {
        console.log('Profile Info for ' + tag);
        //console.log(JSON.stringify(profileJson, null, 2));

        res.send({ 
            info: profileJson,
            message: 'Got Profile!'
        });
    });
});

app.get('/api/stats/:userId', (req, res) => {
    console.log('GET /api/stats/' + req.params.userId);

    const platform = 'pc';
    const region = 'us';
    const tag = req.params.userId;
    
    overwatch.getStats(platform, region, tag, (statsJson) => {
        //console.log('Stats for ' + tag);
        console.log(JSON.stringify(statsJson.stats.top_heroes, null, 2));
        
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