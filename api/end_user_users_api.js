const End_user = require('../models/end_user_users')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  getUser,
  listUser,
  createUser,
  editUser,
  deleteUser,
  validateUser,
  getUser_group,
  get_embeddings
})

async function getUser (req, res, next) {

  if (!req.isAdmin) return forbidden(next)

  const  {id}  = req.params
  // console.log(req.params)
  const end_user = await End_user.get(id)
  if (!end_user) return next()

  res.json(end_user)
 
}

async function get_embeddings (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const  id  = req.body.action_taker_id

  const end_user = await End_user.get_embeddings(id)
  if (!end_user) return next()

  res.json(end_user)
}

async function getUser_group (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const id  = req.body.action_taker_id
  // console.log(id)

  const end_user = await End_user.get_users(id)
  if (!end_user) return next()

  res.json(end_user)
}


async function listUser (req, res, next) {

  if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, tag } = req.query

  const end_user = await End_user.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(end_user)
}

async function createUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const end_user = await End_user.create(req.body)
  res.json(end_user)
}

async function editUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  const change = req.body
  const end_user = await End_user.edit(req.params.id, change)

  res.json(end_user)
}

async function deleteUser (req, res, next) {
  if (!req.isAdmin) return forbidden(next)

  await End_user.remove(req.params.id)
  res.json({ success: true })
}

async function validateUser (req, res, next) {
  const id = req.body.end_user_id
  const id1 =req.body.password
  const response1 = await End_user.validate(id,id1)
  if (response1.success==false) return  res.json({ success: false })

  res.json({ success: true,mobile:response1.mobile_number,email:response1.email })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


