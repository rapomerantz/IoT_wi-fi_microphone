const express = require('express');
const pool = require('./pool');
const CronJob = require('cron').CronJob;
const axios = require('axios');
const moment = require('moment');



//Currently my device's info is hardcoded into the API query - this will be changed before the project is done :) 

// Every 1 seconds makes an axios call to Photon
// new CronJob('*/1 * * * * *', function() {
//     axios.get("https://api.spark.io/v1/devices/3a0027001647343339383037/audioSpl?access_token=e91ff47d87b3de73e3bae77bb9c6d6d8ab1504dd").then((response) => {
//         // console.log(response.data);
//         let timestamp = moment().format();
//         // console.log('timestamp:', timestamp);
//         console.log('Current SPL: ',response.data.result);
//         // console.log('Device ID: ', response.data.coreInfo.deviceID);

//         //query to be sent to SQL db
//     let queryText = `INSERT INTO spl_data (device_id, spl, stamp) 
//                     VALUES ('${response.data.coreInfo.deviceID}', '${response.data.result}', '${timestamp}');`
//         pool.query(queryText)
//             .then((result) => {
//                 // console.log('successful post to db');
//             }) 
//             .catch((err) => {
//                 console.log('error in post to db', err);
//         })
//     }).catch((err) => {
//         console.log('things broke');
//     })
//     }, null, true, 'America/Los_Angeles');
    

// module.exports = CronJob; 