const fs = require('fs')
const path = require('path')
const {getCubes} = require('./database');

const getAllCubes = (callback) => {
    getCubes((cubes) => {
        callback(cubes);
    });
}

module.exports = {
    getAllCubes
}
