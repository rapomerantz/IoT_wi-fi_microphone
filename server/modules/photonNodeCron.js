// const express = require('express');
// const pool = require('./pool');
// const CronJob = require('cron').CronJob;
// const axios = require('axios');
// const moment = require('moment');



// //Currently my device's info is hardcoded into the API query - this will be changed before the project is done :) 

// // Every 1 seconds makes an axios call to Photon
// new CronJob('*/1 * * * * *', function() {
//     axios.get("https://api.spark.io/v1/devices/3a0027001647343339383037/audioSpl?access_token=e91ff47d87b3de73e3bae77bb9c6d6d8ab1504dd").then((response) => {
//         let timestamp = moment().format();
//         let deviceId = response.data.coreInfo.deviceID;
//         let splResult = response.data.result
//         console.log('Current SPL: ',response.data.result);

//     //remove outlier data 
//         if (splResult < 30) {
//             splResult = null
//         } else if (splResult > 125 ) {
//             splResult = null
//         }

//         //query to be sent to SQL db
//     let queryText = `INSERT INTO spl_data (device_id, spl, stamp) 
//                     VALUES ('${deviceId}', '${splResult}', '${timestamp}');`
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