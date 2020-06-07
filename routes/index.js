// TODO: Require Controllers...
const {Router} = require('express');
const {getAllCubes} = require('../controllers/cubes');
const {getCube} = require('../controllers/database');

const router = Router();

router.get('/', (req, res) => {
    getAllCubes((cubes => {
        res.render('index', {
            title: 'Cube workshop',
            cubes,
        });
    }))
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
   getCube(req.params.id,(cube) => {
       res.render('details', {
           title: 'Details | Cube workshop',
           ...cube
       });
   });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube workshop'
    });
});

module.exports = router;