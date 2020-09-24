const cuid = require('cuid')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const { isEmail, isAlphanumeric } = require('validator')
const SALT_ROUNDS = 10

const db = require('../db')

const User = db.model('Action_taker', {
  _id: { type: String, default: cuid },
  master_id: { type: String, required: true,unique:false },
  dean_id: { type: String, required: true,unique:false },
  group_tag: { type: String, required: true,unique:false },
  device_id: { type: String, required: true,unique:false },
  device_password: { type: String, required: true,unique:false },
  username: usernameSchema(),
  action_taker_id: dean_idSchema(),
  password: { type: String, SSrequired: true },
  email: emailSchema({ required: true }),
  mobile_number: mobile_numberSchema(),
  designation: { type: String, required: true }
})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  validate,
  userCheck,
  model: User
}

async function list (opts = {}) {
  const { offset = 0, limit = 25, productId, status } = opts

  const query = {}
  if (productId) query.products = productId
  if (status) query.status = status

  const users = await User.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return users
}
async function validate (mas_id,pas) {

 
  const userr = await User.find({action_taker_id:mas_id})
  if(userr.length >0)
  {
   userr.map((a1)=> {
   pas1 = a1.password
  })
  const result = await checkUser(pas,pas1)
  const response_final = {success:result,data:userr}
  // console.log(filter2)
  return response_final
}
else
{
  return {success:false}
}

}

async function userCheck (input_id) {

 const dummy = await User.find({action_taker_id:input_id})
  if(dummy.length==0){
   const dummy2="false" 
   return dummy2}
  else{
  const dummy2="true" 
  return dummy2}

}



async function get (_id) {
  const user = await User.findOne({ _id })
  return user
}

async function create (fields) {
  const user = new User(fields)
  await hashPassword(user)
  await user.save()
  return user
}

async function edit (_id, change) {
  const user = await get({_id})
  Object.keys(change).forEach(function (key) {
    user[key] = change[key]
  })
  if (change.password) await hashPassword(user)
  await user.save()
  return user
}

async function remove (_id) {
  await User.deleteOne({ _id })
}

async function isUnique (doc, username) {
  const existing = await get(username)
  return !existing || doc._id === existing._id
}

async function isUnique1 (doc, username) {
  
  const existing = await User.findOne({ action_taker_id:username })
  return !existing || doc._id === existing._id 
}

async function isUnique2 (doc, username) {
  
  const existing = await User.findOne({ mobile_number:username })
  return !existing || doc._id === existing._id
}
async function isUnique3 (doc, username) {
  
  const existing = await User.findOne({ email:username })
  return !existing || doc._id === existing._id
}
async function isUnique4 (doc, username) {
  
  const existing = await Principal1.userCheck({ username })
  return existing
}


function usernameSchema () {
  return {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    // maxLength: 6,
    validate: [
      {
        validator: isAlphanumeric,
        message: props => `${props.value} contains special characters`
      },
      // {
      //   validator: str => !str.match(/^333333$/i),
      //   message: props => 'Invalid username'
      // },
      {
        validator: function (username) { return isUnique(this, username) },
        message: props => 'Username is taken'
      }
    ]
  }
}

function dean_idSchema () {
  return {
    type: String,
    required: true,
    unique: true,
    
    // minLength: 6,
    // maxLength: 16,
    
    validate: [
      {
       
        validator: function (dean_id) { return isUnique1(this, dean_id) },
        message: props => 'Action_taker ID is taken'
      }
    ]
  }
}

function mobile_numberSchema () {
  return {
    type: String,
    required: true,
    unique: true,
    
    minLength: 6,
    maxLength: 16,
    
    validate: [
      {
       
        validator: function (mobile_number) { return isUnique2(this, mobile_number) },
        message: props => 'Mobile number is taken'
      }
    ]
  }
}

function emailSchema (opts = {}) {
  const { required } = opts
  return {
    type: String,
    required: !!required,
    validate: [{
      validator: isEmail,
      message: props => `${props.value} is not a valid email address`
    },
    {
       
      validator: function (email) { return isUnique3(this, email) },
      message: props => 'Email is taken'
    }]
  }
}

async function hashPassword (user) {
  if (!user.password) throw user.invalidate('password', 'password is required')
  if (user.password.length < 12) throw user.invalidate('password', 'password must be at least 12 characters')

  user.password = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS)
}

async function checkUser(pas1, pas2) {

  const match = await bcrypt.compare(pas1,pas2);
  return match

}
