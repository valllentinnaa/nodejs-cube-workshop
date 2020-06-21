const express = require('express');
const {getAllCubes, getCubeWithAccessories, updateCube} = require('../controllers/cubes');
const Cube = require('../models/cube');

const router = express.Router();


router.get('/', async (req, res) => {
    const cubes = await getAllCubes();
    res.render('index', {
        title: 'Cube workshop',
        cubes
    });
});

router.get('/edit', (req, res) => {
    res.render('editCubePage');
});

router.get('/delete', (req, res) => {
    res.render('deleteCubePage');
});

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    res.render('details', {
        title: 'Details | Cube workshop',
        ...cube
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create cube | Cube workshop'
    });
});

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body

    const cube = new Cube({name, description, imageUrl, difficulty: difficultyLevel});

    cube.save((err) => {
        if (err) {
            console.error(err);
            res.redirect('/create');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;