// ✅ FIXED: Added missing variable assignment
const mongoose = require("mongoose")

const quantitydata = new mongoose.Schema({
    value: { type: Number, required: true }
})

const quantityModel = mongoose.model("Quantity", quantitydata)
module.exports = quantityModel
