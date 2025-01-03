const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
    district: { type: String, required: true },
    floor: { type: Number, required: true },
    area: { type: Number, required: true },
    rooms: { type: Number, required: true },
    ownerInfo: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Apartment', apartmentSchema);
