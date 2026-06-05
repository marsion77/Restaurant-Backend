const quantityService = require("../Services/quantityService")



//creating the category
const createQuantity = async (req, res) => {
    data = await quantityService.quantityCreate(req.body)
    res.send(data)

}


// ✅ ADD THESE GET FUNCTIONS
const getQuantities = async (req, res) => {
    try {
        data = await quantityService.getAllQuantities()
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getQuantity = async (req, res) => {
    try {
        data = await quantityService.getQuantityById(req.params.id)
        if (!data) {
            return res.status(404).send({ message: "Quantity not found" })
        }
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createQuantity,
    getQuantities,
    getQuantity

} 