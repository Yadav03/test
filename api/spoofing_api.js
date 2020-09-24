const Spoofing = require('../models/spoofing')
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

  const spoofing = await Spoofing.get_action_taker_level(id)
  if (!spoofing) return next()

  res.json(spoofing)
}



async function create (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const spoofing = await Spoofing.create(req.body)
  res.json(spoofing)
}

async function edit (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const spoofing = await Spoofing.edit(req.params.id, change)

  res.json(spoofing)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  await Spoofing.remove(req.params.id)
  res.json({ success: true })
}




function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


