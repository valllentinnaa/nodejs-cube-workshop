const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        required: true
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube' //shows to with models referents
    }]
});

AccessorySchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http://') || url.startsWith('https://');
}, 'Image URL is not valid, should be https');

module.exports = mongoose.model('Accessory', AccessorySchema);