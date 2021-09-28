var express = require('express');
var router = express.Router();
var path = require('path');
const { Op } = require("sequelize");
const db = require(path.resolve('./', 'models'));

router.post('/', (req, res) => {
    db.User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        db.History.create({ user_id: user.id, theme_id: req.body.themeid, answer: req.body.answer });
        res.send("submitted answer");
    });
})

module.exports = router;