const cuid = require('cuid')

const db = require('../db')

const User = db.model('Attendance_Schema', {
  _id: { type: String, default: cuid },
  action_taker_id: { type: String, required: true,unique:false },
  data: [{
    
            day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
          },
   {
            day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
  
          },
         {
            day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
       
          },
         {
          day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
   
          },
           {
            day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
        
          },
           {
            day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
     
          },
         {
          day:{ type: String,required: true},
            freeze: { type: String, required: true,unique:false },
            device_id: { type: String, required: true,unique:false },
            password: { type: String, required: true,unique:false },
            principal_id: { type: String, required: true,unique:false },
            dean_id: { type: String, required: true,unique:false },
            action_taker_id: { type: String, required: true,unique:false },
            date: { type: String, required: true,unique:false },
            slot_data: { type: [Object], index: true },
            slot_time: { type: [Object], index: true },
            slot_name: { type: [Object], index: true },
     
       
          }]


})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  get_special,
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


async function get (username) {
  const user = await User.findOne({action_taker_id: username })
  return user
}
async function get_special (date1,day1,actiontakerid) {
   let user = await User.find({"action_taker_id":actiontakerid})
// console.log(user)
  let attendace_data = []

   user.map((data1)=> 
 {
   data1.data.map((data2)=> {
     if(data2.day == day1)
     {
       data2.date =date1
      attendace_data.push(data2)
    // console.log(data2.day)
     }
   })})



  //  console.log(attendace_data)
  // console.log(user.MONDAY)
return attendace_data
}


async function create (fields) {

  const result =  await User.find({action_taker_id:fields.action_taker_id})

if(result.length==0)
{
  const user = new User(fields)
  await user.save()
  return user

}
else
{
  const result1 =  await get(fields.action_taker_id)
  Object.keys(fields).forEach(function (key) {
    result1[key] = fields[key]
  })
  // if (change.password) await hashPassword(user)
  await result1.save()
  return result1



}

}

 
async function edit (username, change) {
  const user = await get(username)
  Object.keys(change).forEach(function (key) {
    user[key] = change[key]
  })
  // if (change.password) await hashPassword(user)
  await user.save()
  return user
}

async function remove (username) {
  await User.deleteOne({ username })
}


