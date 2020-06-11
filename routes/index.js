const {Router} = require('express');
const {getAllCubes, getCubeWithAccessories, updateCube} = require('../controllers/cubes');
const {getAccessories} = require('../controllers/accessories');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

const router = Router();

router.get('/', async (req, res) => {
    const cubes = await getAllCubes();
    res.render('index', {
        title: 'Cube workshop',
        cubes
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

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
        res.render('details', {
            title: 'Details | Cube workshop',
            ...cube
        });
});

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory'
    });
});

router.post('/create/accessory', async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const accessory = new Accessory({name, description, imageUrl});

    await accessory.save();

    res.redirect('/create/accessory');
});

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);
    const accessories = await getAccessories();

    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories,
        isFullyAttached: cube.accessories.length === accessories.length
    });
});

router.post('/attach/accessory/:id', async (req, res) => {
    const cubeId = req.params.id;
    const {
        accessory
    } = req.body
    await updateCube(cubeId, accessory);


    res.redirect(`/details/${cubeId}`);
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error | Cube workshop'
    });
});

module.exports = router;