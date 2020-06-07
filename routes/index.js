// TODO: Require Controllers...
const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube workshop'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About | Cube workshop'
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create cube | Cube workshop'
    });
});

router.get('/details/:id', (req, res) => {
    res.render('details', {
        title: 'Details | Cube workshop'
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube workshop'
    });
});

module.exports = router;