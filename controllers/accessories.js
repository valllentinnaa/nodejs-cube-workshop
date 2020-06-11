const Accessory = require('../models/accessory');

const getAccessories = async () => {
    // With lean it returns plain js object, not a mongoose one
    const accessories = await Accessory.find().lean();
    return accessories;
}

module.exports = {
    getAccessories
};
