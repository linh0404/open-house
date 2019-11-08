const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const passport = require('../passport');
const mongo = require('mongodb');
var assert = require('assert');

const url = 'mongodb://localhost:27017/open_house';


router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
});


router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
);

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
});

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/get-data', function (req, res, next) {
    var enrollmentArray = [];
    mongo.connect(url, function (err, db) {
        // using assert to check if there is an error
        // or there is no data at all
        assert.equal(null, err);
        var cursor = db.collection('enrollment').find();
        cursor.forEach(function (data, error) {
            assert.equal(null, error);
            enrollmentArray.push(data);
        }, function () {
            db.close();
            res.render('index', { item: enrollmentArray });
        })
    })
});

router.post('/insert', function (req, res, next) {
    const item = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        father: req.body.father,
        mother: req.body.mother
    }

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        // accessing the database using collection enrollment
        db.collection('enrollment').insertOne(item, function (errm, result) {
            assert.equal(null, err);
            console.log("New enrollment inserted");
            db.close();
        })
    })
});


router.post('/delete', function (req, res, next) {

})


module.exports = router;