const cuid = require('cuid')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const { isEmail, isAlphanumeric } = require('validator')
const SALT_ROUNDS = 10

const db = require('../db')

const User = db.model('End_user', {
  _id: { type: String, default: cuid },
  master_id: { type: String, required: true,unique:false },
  dean_id: { type: String, required: true,unique:false },
  action_taker_id: { type: String, required: true,unique:false },
  end_user_id: dean_idSchema(),
  group_tag: { type: String, required: true,unique:false },
  username: { type: String, required: true,unique:false },
  password: { type: String, required: true },
  email: emailSchema({ required: true }),
  mobile_number: mobile_numberSchema(),
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  encodings: { type: Object, required: true },
  names: { type: Object, required: true },
  uri:{ type: String, required: true }
})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  validate,
  userCheck,
  get_users,
  get_embeddings,
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

 
  const userr = await User.find({end_user_id:mas_id})
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
  const user = await User.findOne({_id})
  return user
}

async function get_users (value) {
  const user = await User.find({ action_taker_id:value })
  // console.log(user,value)
  return user
}



async function get_embeddings (value) {
  const user = await User.find({ action_taker_id:value })

  // console.log(user.embeddings)
let embeddings_bucket =[]
let names_bucket =[]
  user.map((a1)=> 
  {
    //  console.log(a1)
    a1.encodings.map((a2)=> 

embeddings_bucket.push(a2))

  }
  )
  user.map((a3)=> 
  {
    a3.names.map((a4)=>

names_bucket.push(a4))

  }
  )
 data = {"encodings":embeddings_bucket,"names":names_bucket} 
  // console.log(user,value)
  return data
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
  await User.deleteOne({ _id})
}

async function isUnique (doc, username) {
  const existing = await get(username)
  return !existing || doc._id === existing._id
}

async function isUnique1 (doc, username) {
  
  const existing = await User.findOne({ end_user_id:username })
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
        message: props => 'End user ID is taken'
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
  if (user.password.length < 8) throw user.invalidate('password', 'password must be at least 12 characters')

  user.password = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS)
}

async function checkUser(pas1, pas2) {

  const match = await bcrypt.compare(pas1,pas2);
  return match

}
