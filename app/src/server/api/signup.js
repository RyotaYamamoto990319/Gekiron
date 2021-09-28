var express = require('express');
var router = express.Router();
var path = require('path');
const db = require(path.resolve('./', 'models'));

router.post('/', (req, res) => {
    db.User.create({ name: req.body.username, email: req.body.email })
    res.send('POST request to the homepage');
})

module.exports = router;