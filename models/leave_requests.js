const cuid = require('cuid')

const db = require('../db')

const Product = db.model('Leave_request', {
  _id: { type: String, default: cuid },
  master_id: { type: String, required: true,unique:false },
  dean_id: { type: String, required: true,unique:false },
  action_taker_id: { type: String, required: true,unique:false },
  end_user_id: { type: String, required: true,unique:false },
  username: { type: String, required: true,unique:false },
  start_date: { type: String, required: true,unique:false },
  end_date: { type: String, required: true,unique:false },
  leave_type: { type: String, required: true,unique:false },
  request_status: { type: String, required: true,unique:false },
  leave_status: { type: String, required: true,unique:false },
  No_of_days: { type: Number, required: true,unique:false },
  designation: { type: String, required: true,unique:false },
  group_tag: { type: String, required: true,unique:false },
  email: { type: String, required: true,unique:false },
  mobile_number: { type: String, required: true,unique:false },
})

module.exports = {
  get_action_taker_level,
  get_end_user_level,
  get_end_user_level_granted,
  list,
  create,
  edit,
  remove,
  model: Product
}


async function list (opts = {}) {
  const { offset = 0, limit = 25, tag } = opts

  const query = tag ? { tags: tag } : {}
  const products = await Product.find(query)
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit)

  return products
}

async function get_action_taker_level (action_taker_id) {
  const product = await Product.find({action_taker_id:action_taker_id})
  return product
}
async function get_end_user_level (end_user_id) {
  const product = await Product.find({end_user_id:end_user_id})
  return product
}
async function get_end_user_level_granted (end_user_id) {
  const product = await Product.find({end_user_id:end_user_id,leave_status:"GRANTED"})
  return product
}

async function create (fields) {
  const product = await new Product(fields).save()
  return product
}
async function get (_id) {
  const product = await Product.findById(_id)
  return product
}
async function edit (_id, change) {
  const product = await get({ _id })
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })
  await product.save()
  return product
}


async function remove (_id) {
  await Product.deleteOne({ _id })
}