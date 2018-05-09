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


// const job = new CronJob({
//     cronTime: '*/1 * * * * *',
//     onTick: function () {
//         console.log('test cron TICK');
//         console.log('!!in cron, deviceId', deviceId);
//         console.log('!!in cron, authToken', authToken);
//     },
//     start: false, 
//     timeZone: 'America/Los_Angeles'
// });


let cronJobsObject = {}; 

//START / STOP cronjob
router.post('/toggleCron', (req, res) => {
    console.log('in /api/devices/toggleCron, active? :', req.body.active);
    let deviceId = req.body.device_id;
    let authToken = req.body.auth_token
    if (req.body.active === true) {
        console.log('turning on a new JOB');

//this function redefines global variable `job` as a new CronJob with selected devices' credentials
//this CronJob will be stopped if the device's `select` boolean = false 

        function startNewCron (deviceId, authToken) {
            cronJobsObject[deviceId] = new CronJob({
                cronTime: '*/1 * * * * *',
                onTick: function () {
                    axios.get(`https://api.spark.io/v1/devices/${deviceId}/audioSpl?access_token=${authToken}`)
                    .then((response) => {
                        let timestamp = moment().format();
                        let splResult = response.data.result
                        console.log('Current SPL: ',response.data.result);
                
                    //remove outlier data 
                        if (splResult < 30) {
                            splResult = null
                        } else if (splResult > 125 ) {
                            splResult = null
                        }
                
                        //query to be sent to SQL db
                    let queryText = `INSERT INTO spl_data (device_id, spl, stamp) 
                                    VALUES ('${deviceId}', '${splResult}', '${timestamp}');`
                        pool.query(queryText)
                            .then((result) => {
                                console.log('successful post to db');
                            }) 
                            .catch((err) => {
                                console.log('error in post to db', err);
                        })
                    }).catch((err) => {
                        console.log('things broke');
                    })
                },
                start: false, 
                timeZone: 'America/Los_Angeles'
            });
        }

        
//call CronJob
        startNewCron(deviceId, authToken)
        

//start CronJob
        cronJobsObject[deviceId].start(); 
        console.log('cronJobsObject:', cronJobsObject);
        res.sendStatus(200); 
    }
    else if (req.body.active === false) {
        console.log('turning OFF job', deviceId);
        cronJobsObject[deviceId].stop(); 
        res.sendStatus(200); 
    }
})





module.exports = router;