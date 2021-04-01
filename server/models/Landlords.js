const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const options = {
  timestamps: true, 
  createdAt: "created_at", 
  updatedAt: "updated_at"
}

const LandlordsSchema = new mongoose.Schema({
  firstName: String, 
  lastName: String, 
  overallRating: Number, 
  wouldRentAgainLevel: Number, 
  tags: [String], 
  friendlinessRating: Number, 
  communicationRating: Number, 
  maintenanceRating: Number, 
  responsivenessRating: Number, 
  transactionIssue: Number,
  reviews:[{type: ObjectId, ref: 'reviews'}],
  properties:[{type: ObjectId, ref: 'properties'}]
}, options)

module.exports = mongoose.model('landlords', LandlordsSchema)