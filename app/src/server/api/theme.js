var express = require('express');
var router = express.Router();
var path = require('path');
const { Op } = require("sequelize");
const db = require(path.resolve('./', 'models'));

router.post('/', (req, res) => {
    db.Theme.count().then(dataCount => {
        idArr = [];
        for (let i=0; i<dataCount; i++) {
            idArr.push(i+1);
        }
        db.User.findOne({
            where: { email: req.body.email }
        }).then(user => {
            db.History.findAll({
                user_id: user.id
            }).then(histories => {
                if (histories) {
                    histories.map((history) => {
                        idArr.splice(history.theme_id-1, 1);
                    });
                }
                console.log(idArr);
                var idx = Math.floor(Math.random() * idArr.length);
                db.Theme.findByPk(idArr[idx]).then(theme=> {
                    res.json({ id: theme.id, theme: theme.content });
                })
            });
        });
        
    });
})

module.exports = router;