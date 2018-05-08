const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const CronJob = require('cron').CronJob;
const axios = require('axios');
const moment = require('moment');



//GET
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

//POST
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

//DELETE
router.delete('/:id', (req, res) => {
    let deviceId = req.params.id;
    console.log(deviceId);
    const queryText = `DELETE FROM person_device WHERE device_id = $1;`
    pool.query(queryText, [deviceId])
    .then((result) => {
        console.log('successful DELETE /api/devices');
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('ERR in DELETE /api/devices', err);
        res.sendStatus(500); 
    })
})

//PUT
router.put('/', (req, res) => {
    let body = req.body;
    console.log(body);
    const queryText = `UPDATE person_device
                        SET device_id = $1, auth_token = $2, device_name = $3
                        WHERE device_id = $4;`
    pool.query(queryText, [body.deviceId, body.authToken, body.deviceName, body.deviceId])
    .then((result) => {
        console.log('successful PUT /api/devices');
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('ERR in PUT /api/devices', err);
        res.sendStatus(500); 
    })
})


//PUT to toggle activate sampling
router.put('/toggleActive', (req, res) => {
    console.log('in /api/devices/toggleActive', req.body);
    const queryText = `UPDATE person_device
                        SET active = NOT active 
                        WHERE device_id = $1;`
    pool.query(queryText, [req.body.device_id])
    .then((result) => {
        console.log('successful PUT /api/devices/toggleActive');
        const checkActiveQuery = `SELECT active FROM person_device WHERE device_id = $1`
        pool.query(checkActiveQuery, [req.body.device_id])
        .then((result) => {
            console.log('checkActiveQuery:', result.rows);
            res.send(result.rows); 
        })
        .catch((err) => {
            console.log('err in checkActiveQuery: ', err);
            
        })
    })
    .catch((err)=> {
        console.log('error in /api/devices/toggleActive', err);
    })
})

const job = new CronJob({
    cronTime: '*/1 * * * * *',
    onTick: function () {
        console.log('test cron TICK');
    },
    start: false, 
    timeZone: 'America/Los_Angeles'
});


//START / STOP cronjob
router.post('/toggleCron', (req, res) => {
    console.log('in /api/devices/toggleCron, active? :', req.body);
    
    if (req.body.active === true) {
        console.log('turning on a new JOB');
        job.start(); 
        res.sendStatus(200); 
    }
    else if (req.body.active === false) {
        console.log('turning OFF job');
        job.stop(); 
        res.sendStatus(200); 
    }
})





module.exports = router;