const express = require('express');
const {saveUser} = require('../controllers/user');

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

module.exports = router;