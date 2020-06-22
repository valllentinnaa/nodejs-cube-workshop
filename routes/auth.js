const express = require('express');
const {saveUser, verifyUser} = require('../controllers/user');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('/register', async (req, res) => {

    const status = await saveUser(req, res);

    if(status) {
        res.redirect('/');
    }

    res.redirect('/');

});

router.post('/login', async (req, res) => {

    const status = await verifyUser(req, res);

    if(status) {
        res.redirect('/');
    }

    res.redirect('/');

});

module.exports = router;