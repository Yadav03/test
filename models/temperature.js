const cuid = require('cuid')

const db = require('../db')

const Product = db.model('Temperature', {
  _id: { type: String, default: cuid },
  master_id: { type: String, required: true,unique:false },
  dean_id: { type: String, required: true,unique:false },
  action_taker_id: { type: String, required: true,unique:false },
  end_user_id: { type: String, required: true,unique:false },
  date: { type: String, required: true,unique:false },
  slot_name: { type: String, required: true,unique:false },
  time: { type: String, required: true,unique:false },
  uri: { type: String, required: true,unique:false },
  deviceid: { type: String, required: true,unique:false },
  status: { type: String, required: true,unique:false },
  temperature: { type: String, required: true,unique:false },
  user_name:{ type: String, required: true,unique:false },

})

module.exports = {
  get_action_taker_level,
  create,
  edit,
  remove,
  model: Product
}



async function get_action_taker_level (action_taker_id) {
  const product = await Product.find({action_taker_id:action_taker_id})
  return product
}

async function create (fields) {
  const result = await Product.find({action_taker_id:fields.action_taker_id,end_user_id:fields.end_user_id,time:fields.time})
  if(result.length == 0)
  {
  const product = await new Product(fields).save()
  return product
  }
  else
  {
    // console.log("exist")
    return "data already exist"
  }
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