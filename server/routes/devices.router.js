const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('/api/devices GET reached');
    const queryText = `SELECT * FROM person_device WHERE person_id = $1;` //<-- user's id goes here
    pool.query(queryText, [req.user.id])
    .then((result) => {
        console.log('successful GET /api/devices');
        res.send(result.rows); 
    })
    .catch((err) => {
        console.log('ERR in GET /api/devices', err);
        res.sendStatus(500); 
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    let body = req.body;
    let user = req.user
    console.log('/api/devices POST', req.body);
    const queryText = `INSERT INTO person_device (person_id, device_id, auth_token, device_name) VALUES ($1, $2, $3, $4)`
    pool.query(queryText, [user.id, body.deviceId, body.authToken, body.deviceName])
    .then((result) => {
        console.log('successful POST /api/devices');
        res.sendStatus(201); 
    })
    .catch((err) => {
        console.log('ERR in POST /api/devices', err);
        res.sendStatus(500); 
    })

});

module.exports = router;