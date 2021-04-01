const mongoose = require('mongoose')

const options = {
  timestamps: true, 
  createdAt: "created_at", 
  updatedAt: "updated_at"
}

const UsersSchema = new mongoose.Schema({
  firstName: String, 
  lastName: String, 
  username: String, 
  email: String, 
  DOB: Date, 
  password: String, 
  properties: {type: Array, "default": []}, 

})

module.exports = mongoose.model("Users", UsersSchema)