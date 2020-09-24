const Dean = require('../models/dean_users')
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

  const dean = await Dean.get(id)
  if (!dean) return next()

  res.json(dean)
}

async function listUser (req, res, next) {

  // if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, tag } = req.query

  const dean = await Dean.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(dean)
}

async function createUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const dean = await Dean.create(req.body)
  res.json(dean)
}

async function editUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const dean = await Dean.edit(req.params.id, change)

  res.json(dean)
}

async function deleteUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await Dean.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.dean_id
  const id1 =req.body.password
  const response1 = await Dean.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


