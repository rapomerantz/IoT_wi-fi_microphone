const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in GET /api/spl, rec.query.quantity:', req.query.quantity);
    let quantity = req.query.quantity;
    const queryText = `SELECT * FROM spl_data 
                        JOIN person_device ON person_device.id = spl_data.person_device_id 
                        WHERE person_device_id = 2 
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