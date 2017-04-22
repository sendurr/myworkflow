var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id:  {type: Number, index: true},
  first_name: String,
  last_name: String,
  role_id: {type: Number, index: true},
  role: String,
  department_id: {type: Number, index: true},
  department: String,
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  dob: { type: Date},
  mobile: String
});

module.exports.user = mongoose.model("user",userSchema);