const Principal = require('../models/principal_users')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  getUser,
  listUser,
  createUser,
  editUser,
  deleteUser,
  validateUser,
  validateUser_principal,
})

async function getUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const { id } = req.params

  const principal = await Principal.get(id)
  if (!principal) return next()

  res.json(principal)
}

async function listUser (req, res, next) {

  if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, tag } = req.query

  const principal = await Principal.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(principal)
}

async function createUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const principal = await Principal.create(req.body)
  res.json(principal)
}

async function editUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const principal = await Principal.edit(req.params.id, change)

  res.json(principal)
}

async function deleteUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await Principal.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.master_id
  const id1 =req.body.password
  const response1 = await Principal.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}
async function validateUser_principal (req, res, next) {
  const id = req.body.master_id
  const id1 =req.body.password
  const response1 = await Principal.validate_principal(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}



function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


