const mongoose = require('mongoose')
const { response } = require('express')

 mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://yadav:yadav@cluster0.ymy0t.mongodb.net/users?retryWrites=true&w=majority',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} 
) 


module.exports = mongoose
