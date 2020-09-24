const Action_taker = require('../models/action_taker_users')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  getUser,
  listUser,
  createUser,
  editUser,
  deleteUser,
  validateUser,
})

async function getUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const { id } = req.params

  const action_taker = await Action_taker.get(id)
  if (!action_taker) return next()

  res.json(action_taker)
}

async function listUser (req, res, next) {

  if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, tag } = req.query

  const action_taker = await Action_taker.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(action_taker)
}

async function createUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const action_taker = await Action_taker.create(req.body)
  res.json(action_taker)
}

async function editUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const action_taker = await Action_taker.edit(req.params.id, change)

  res.json(action_taker)
}

async function deleteUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await Action_taker.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.action_taker_id
  const id1 =req.body.password
  const response1 = await Action_taker.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,data:response1.data })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


