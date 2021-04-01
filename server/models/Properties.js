const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const options = {
  timestamps: true, 
  createdAt: "created_at", 
  updatedAt: "updated_at"
}


const Properties = new mongoose.Schema({
  landlord: {type: ObjectId, ref: 'Landlords'}, 
  address: {
    streetAddress1: String, 
    streetAddress2: String, 
    city: String, 
    state: String, 
    zipcode: String,
  }, 
  management: {type: ObjectId, ref: 'Landlords'}, 
  type: String, 
  cleanliness: Number, 
  neighborsVibes: [String], 
  propertyIssues: [String], 
  noiseLevelRating: Number, 
  reviews:[{type: ObjectId, ref: 'Reviews'}], 
}, options)
module.exports = mongoose.model('properties', Properties, 'properties')