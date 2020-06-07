const fs = require('fs')
const path = require('path')
const databaseFile = path.join(__dirname, '..', 'config/database.json')

const saveCube = (cube) => {
    getCubes((cubes) => {
        cubes.push(cube);

        fs.writeFile(databaseFile, JSON.stringify(cubes), err => {
            if (err) {
                throw err
            }
            console.log('New cube is successfully stored');
        });
    });
}

const getCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(cube => cube.id === id)[0]
        callback(cube)
    })
}

const getCubes = (callback) => {
    fs.readFile(databaseFile, (err, dbData) => {
        if (err) {
            throw err
        }
        const cubes = JSON.parse(dbData);
        callback(cubes);
    })
}

module.exports = {
    saveCube,
    getCubes,
    getCube
}