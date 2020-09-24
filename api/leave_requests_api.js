const Leave_request = require('../models/leave_requests')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  get_action_taker_level, 
  get_end_user_level,
  get_end_user_level_granted,
  create,
  edit,
  deleteUser,
  validateUser,
})

async function get_action_taker_level (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const  id  = req.body.action_taker_id

  const leave_request = await Leave_request.get_action_taker_level(id)
  if (!leave_request) return next()

  res.json(leave_request)
}

async function get_end_user_level (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const  id  = req.body.end_user_id

  const leave_request = await Leave_request.get_end_user_level(id)
  if (!leave_request) return next()

  res.json(leave_request)
}


async function get_end_user_level_granted (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const  id  = req.body.end_user_id

  const leave_request = await Leave_request.get_end_user_level_granted(id)
  if (!leave_request) return next()

  res.json(leave_request)
}



async function create (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const leave_request = await Leave_request.create(req.body)
  res.json(leave_request)
}

async function edit (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const leave_request = await Leave_request.edit(req.params.id, change)

  res.json(leave_request)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  await Leave_request.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.leave_request_id
  const id1 =req.body.password
  const response1 = await Leave_request.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


