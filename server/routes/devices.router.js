const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('/api/devices GET reached');
    const queryText = `SELECT * FROM person_device WHERE person_id = 1;` //<-- user's id goes here
    pool.query(queryText)
    .then((result) => {
        console.log('successful GET /api/devices');
        res.send(result.rows); 
    })
    .catch((err) => {
        console.log('ERR in GET /api/devices');
        res.sendStatus(500); 
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;