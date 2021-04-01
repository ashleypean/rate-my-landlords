const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const options = {
  timestamps: true, 
  createdAt: "created_at", 
  updatedAt: "updated_at"
}

const ReviewsSchema = new mongoose.Schema({
  reviewedBy: {type: ObjectId, ref: 'Users'}, 
  landlordReview: {
    wouldRentAgain: Boolean, 
    friendlinessRating: Number, 
    communicationRating: Number, 
    responsivenessRating: Number, 
    maintenanceRating: Number, 
    transactionIssues: Boolean
  }, 
  propertyReview: {
    moveInDate: Date, 
    moveOutDate: Date, 
    cleanliness: Number, 
    neighborsVibes: {type: Array, "default": []}, 
    propertyIssues: {type: Array, "default": []}, 
    noiseLevelRating: Number,
  },
  reviewBody: String
}, options)

module.exports = mongoose.model('reviews', ReviewsSchema)