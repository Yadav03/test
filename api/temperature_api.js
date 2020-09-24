const Temperature = require('../models/temperature')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  get_action_taker_level, 
  create,
  edit,
  deleteUser,
})

async function get_action_taker_level (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const  id  = req.body.action_taker_id

  const temperature = await Temperature.get_action_taker_level(id)
  if (!temperature) return next()

  res.json(temperature)
}



async function create (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const temperature = await Temperature.create(req.body)
  res.json(temperature)
}

async function edit (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const temperature = await Temperature.edit(req.params.id, change)

  res.json(temperature)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  await Temperature.remove(req.params.id)
  res.json({ success: true })
}




function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


