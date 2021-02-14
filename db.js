
const mongoose = require('mongoose')
const { response } = require('express')

mongoose.connect(
  process.env.MONGO_URI || 'mongodb+srv://sonakshi:KAKA2602@cluster0.rgloh.mongodb.net/tcs_task?retryWrites=true&w=majority',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} 
)

module.exports = mongoose

