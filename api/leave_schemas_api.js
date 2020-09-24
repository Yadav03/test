const Leave_schemas = require('../models/leave_schemas')
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

  const leave_schemas = await Leave_schemas.get_action_taker_level(id)
  if (!leave_schemas) return next()

  res.json(leave_schemas)
}



async function create (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const leave_schemas = await Leave_schemas.create(req.body)
  res.json(leave_schemas)
}

async function edit (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const leave_schemas = await Leave_schemas.edit(req.params.id, change)

  res.json(leave_schemas)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  await Leave_schemas.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.leave_schemas_id
  const id1 =req.body.password
  const response1 = await Leave_schemas.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


