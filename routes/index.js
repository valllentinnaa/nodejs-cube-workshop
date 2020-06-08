const {Router} = require('express');
const {getAllCubes} = require('../controllers/cubes');
const {getCube} = require('../controllers/database');
const Cube = require('../models/cube');

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

router.post('/create', (req, res) => {
    console.log(req.body);
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const cube = new Cube(name, description, imageUrl, difficultyLevel);

    cube.save(() => {
        res.redirect('/');
    });
});

router.get('/details/:id', (req, res) => {
    getCube(req.params.id, (cube) => {
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