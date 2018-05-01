const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in GET /api/spl, rec.query.quantity:', req.query.quantity);
    let quantity = req.query.quantity;

    //device id goes in WHERE below
    let queryText = `SELECT spl_data.device_id, person_id, spl, stamp FROM spl_data 
                        JOIN person_device ON person_device.device_id = spl_data.device_id 
                        WHERE spl_data.device_id = '3a0027001647343339383037'  
                        ORDER BY stamp DESC
                        LIMIT ${quantity};`
    pool.query(queryText)
    .then((result) => {
        console.log('successful GET /api/spl', result.rows);
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

});

module.exports = router;