const Cube = require('../models/cube');

const getAllCubes = async () => {
    // With lean it returns plain js object, not a mongoose one
    const cubes = await Cube.find().lean();
    return cubes;
};

const getCube = async (id) => {
    // With lean it returns plain js object, not a mongoose one
    const cube = await Cube.findById(id).lean();
    return cube;
};

module.exports = {
    getAllCubes,
    getCube
};
