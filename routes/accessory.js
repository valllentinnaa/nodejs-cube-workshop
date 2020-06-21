const express = require('express');
const {getAllCubes, getCubeWithAccessories, updateCube} = require('../controllers/cubes');
const {getAccessories} = require('../controllers/accessories');
const Accessory = require('../models/accessory');

const router = express.Router();

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

module.exports = router;