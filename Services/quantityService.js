const quantityModel = require("../Model/quantityModel")

//creating Category

const quantityCreate = async (body) => {
  data = await quantityModel.create(body)
  return data
}

// ✅ ADD THESE GET FUNCTIONS
const getAllQuantities = async () => {
  data = await quantityModel.find()
  return data
}

const getQuantityById = async (id) => {
  data = await quantityModel.findById(id)
  if (!data) {
    throw new Error("Quantity not found")
  }
  return data
}

module.exports = {
    quantityCreate,
    getAllQuantities,
    getQuantityById

} 