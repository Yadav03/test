const cuid = require('cuid')

const db = require('../db')

const Product = db.model('Leave_schema', {
  _id: { type: String, default: cuid },
  master_id: { type: String, required: true,unique:false },
  dean_id: { type: String, required: true,unique:false },
  action_taker_id: { type: String, required: true,unique:false },
  start_date: { type: String, required: true,unique:false },
  end_date: { type: String, required: true,unique:false },
  leave_plan: { type: [Object], index: true,required:true},

})

module.exports = {
  get_action_taker_level,
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