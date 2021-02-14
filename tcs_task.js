const cuid = require('cuid')
const { da } = require('date-fns/locale')

const db = require('./db')

const Data = db.model('tcs_task', {
  _id: { type: String, default: cuid },
  info: { type: String, required: true},
  entry_date: { type: String, required: true},

})

module.exports = {
  list,
  create,
  model: Data
}

async function list () {
  const data = await Data.find({})
  return data
}

async function create (fields) {
  const data = new Data(fields)
  await data.save()
  return data
}

