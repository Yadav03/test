const Holiday_schemas = require('../models/holiday_schemas')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  get_action_taker_level, 
  create,
  edit,
  deleteUser,
  validateUser,
})

async function get_action_taker_level (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const  id  = req.body.action_taker_id

  const holiday_schemas = await Holiday_schemas.get_action_taker_level(id)
  if (!holiday_schemas) return next()

  res.json(holiday_schemas)
}



async function create (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const holiday_schemas = await Holiday_schemas.create(req.body)
  res.json(holiday_schemas)
}

async function edit (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const holiday_schemas = await Holiday_schemas.edit(req.params.id, change)

  res.json(holiday_schemas)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  await Holiday_schemas.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.holiday_schemas_id
  const id1 =req.body.password
  const response1 = await Holiday_schemas.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


