const jwt = require('jsonwebtoken')
const Users = require('../models/end_user_users')
const autoCatch = require('../lib/auto-catch')

const jwtSecret = process.env.JWT_SECRET || 'mark it zero'

module.exports = {
  ensureUser: autoCatch(ensureUser)
}

async function ensureUser (req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)
    // console.log(payload)

  if (payload) {
  
   const varr = await  Users.validate(payload.id,payload.password)
  //  console.log(varr)
    if (varr.success == true) req.isAdmin = true
    return next()
  }

  const err = new Error('Unauthorized')
  err.statusCode = 401
  next(err)
}

async function verify (jwtString = '') {
  jwtString = jwtString.replace(/^Bearer /i, '')

  try {
    const payload = await jwt.verify(jwtString, jwtSecret)
    return payload
  } catch (err) {
    err.statusCode = 401
    throw err
  }
}
