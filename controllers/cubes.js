const Cube = require('../models/cube');

const getAllCubes = async () => {
    // With lean it returns plain js object, not a mongoose one
    const cubes = await Cube.find().lean();
    return cubes;
};

const getCubeWithAccessories = async (id) => {
    // With lean it returns plain js object, not a mongoose one
    const cube = await Cube.findById(id).populate('accessories').lean();
    console.log(cube);
    return cube;
};

const updateCube = async (id, accessoryId) => {
    // With lean it returns plain js object, not a mongoose one
    await Cube.findByIdAndUpdate(id, {
        $addToSet: {
            accessories: [accessoryId]
        }
    })
}

module.exports = {
    getAllCubes,
    getCubeWithAccessories,
    updateCube
};
