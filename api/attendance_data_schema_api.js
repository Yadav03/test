const Attendance_data = require('../models/attendance_data_schema')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  get,
  listUser,
  createUser,
  editUser,
  deleteUser,
})

async function get (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const actiontakerid = req.body.action_taker_id
  

  const attendance_data1 = await Attendance_data.get(actiontakerid)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}

async function listUser (req, res, next) {

  // if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, tag } = req.query

  const attendance_data = await Attendance_data.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(attendance_data)
}

async function createUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const attendance_data = await Attendance_data.create(req.body)
  res.json(attendance_data)
}

async function editUser (req, res, next) {
   if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const attendance_data = await Attendance_data.edit(req.params.id, change)

  res.json(attendance_data)
}

async function deleteUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await Attendance_data.remove(req.params.id)
  res.json({ success: true })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


