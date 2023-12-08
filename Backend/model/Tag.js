const mongoose = require('mongoose');


const Tag = new mongoose.Schema({
  name: { type: String},
  semester : {type:String}
})

module.exports = mongoose.model('Tag',Tag);

