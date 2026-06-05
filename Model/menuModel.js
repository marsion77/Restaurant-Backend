const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',  // Matches your category model name
    required: [true, "Category is required"] 
  },
  type: { type: String, required: [true, "Type is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  description: String,
  image: String,
  baseGrams: { type: Number, default: 100 },
  rating: { type: Number, default: 4.5 }
}, { timestamps: true })

module.exports = mongoose.model("Menu", menuSchema)
