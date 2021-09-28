var express = require('express');
var router = express.Router();
var path = require('path');
const { Op } = require("sequelize");
const db = require(path.resolve('./', 'models'));

router.post('/', (req, res) => {
    db.User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        res.json({ name: user.name });
    });
})

module.exports = router;