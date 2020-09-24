const cuid = require('cuid')
const db = require('../db')
var eachDayOfInterval = require('date-fns/eachDayOfInterval')
const process2 = require('../models/attendance_data_schema')

const User = db.model('Attendance_data', {
  _id: { type: String, default: cuid },
  main_date: { type: String, required: true,unique:false },
  action_taker_id: { type: String, required: true,unique:false },
  dean_id: { type: String, required: true,unique:false },
  principal_id: { type: String, required: true,unique:false },
  data: { type: [Object], index: true },
  
})

module.exports = {
  get_special_device,
  edit_special_device,
  list_special,
  remove,
  create_special,
  get_principal_report,
  get_dean_report,
  get_action_taker_report,
  get_student_report,
  edit_student_report,
  model: User
}

async function list_special (opts = {}) {
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
// 

async function get_principal_report (startDate,endDate,principal_id)
{
  fulldata = await User.find({ main_date: { $gt: startDate, $lt: endDate},principal_id:principal_id })
  return fulldata

  
 } 
 
 

async function get_dean_report (startDate,endDate,principal_id,dean_id)
{
  fulldata = await User.find({ main_date: { $gt: startDate, $lt: endDate},principal_id:principal_id,dean_id:dean_id })
  return fulldata

  
 } 


 async function get_action_taker_report (startDate,endDate,principal_id,dean_id,action_taker_id)
 {
  fulldata = await User.find({ main_date: { $gt: startDate, $lt: endDate},principal_id:principal_id,dean_id:dean_id,action_taker_id:action_taker_id })
  return fulldata
   
  } 


  async function get_student_report (startDate,endDate,principal_id,dean_id,action_taker_id,end_user_id)
 {

  fulldata = await User.find({ main_date: { $gt: startDate, $lt: endDate},principal_id:principal_id,dean_id:dean_id,action_taker_id:action_taker_id })
  
     let report_bucket =[]
 
     fulldata.map((a2) => 
     {
       
         report_bucket.push(a2.data)
       
      
      })
     let report_bucket_final =[]
     report_bucket.map((c1) =>
     {

       c1.map((c2) => 
       {
           
             
             report_bucket_final.push(c2.slot_data)
             
           
          
          })})

    let report_bucket_student_final =[]
//  console.log(report_bucket_final)
    report_bucket_final.map((c3) => 
           
      {
        c3.map((c4)=>
        {

              if(c4.end_user_id == end_user_id)
              {
                report_bucket_student_final.push(c4)
                // console.log("dhbcejfwebs")

              }
              // else{

              // }
            
            })})
      
    return report_bucket_student_final
  } 



  async function edit_student_report (startDate,endDate,principal_id,dean_id,action_taker_id,change)
  {
  
    fulldata = await User.find({ main_date: { $gt: startDate, $lt: endDate},principal_id:principal_id,dean_id:dean_id,action_taker_id:action_taker_id })

      let flag = 0
       fulldata.map((a2) => 
      {
        a2.data.map((c1) =>
      {
       
           c1.slot_data.map((c3) => 
            
             {
              console.log(c3)
      
                    if(c3.end_user_id == change.end_user_id)
                    {
                      
                      // c3.P1 = change.P1
                    
                       Object.keys(change).forEach(function (key) {
                        c3[key] = change[key]
                      })
                      // console.log(c3)
                      
                      flag =1
                      //  report_bucket_student_final.push(c5)
                    }
                    else{
                      flag =0
                    }
                  
                  })
                  // else
                  // {

                  // }
                  
                  })})
    // return fulldata
  
    let final_edit = []
    fulldata.map((final)=> {final_edit =final.data})
    // console.log(final_edit)
    if(final_edit.length > 0 && flag == 1)
    {
    await User.updateMany({main_date: { $gt: startDate, $lt: endDate},principal_id:principal_id,dean_id:dean_id,action_taker_id:action_taker_id},{$set: {data:final_edit}})
    return {"success":true}}
    else
    {
      return {"success":false}
    }
 
    } 


  
 
 



async function get_special_device (device_id,device_password,action_taker_id,date) {
  const user = await User.findOne({ main_date:date,action_taker_id:action_taker_id })
  let return_data = {}
   await user.data.map((overall)=>
  {
    if(overall.action_taker_id == action_taker_id && overall.device_id == device_id && overall.password == device_password)
{
  return_data = overall
}
  // else
  // {
  // }
   
})

 return return_data
}



async function create_special (date2,day2,action_taker_id,dean_id,principal_id) {

  let attendace_object =[]
  let dummy4=[]
   dummy4 = await User.find({main_date:date2,principal_id:principal_id,dean_id:dean_id,action_taker_id:action_taker_id})
   let len = dummy4.length
  //  console.log(len)
  if(len == 0 )
  {
      attendace_object= await process2.get_special(date2,day2,action_taker_id)
      let json_body = { main_date: date2,data:attendace_object,action_taker_id:action_taker_id,dean_id:dean_id,principal_id:principal_id}
      const user = new User(json_body)
      await user.save()
      // console.log("new entry created successfully")
      return {"success":"true"}
  }
  else
  {
    return {"success":"false"}
  }

}

async function edit_special_device (change) {
  

    let fulldata = await User.findOne({ main_date:change.date,action_taker_id:change.action_taker_id})
    let flag1 = 0

      await fulldata.data.map((c1) =>
    {

    if(c1.device_id == change.device_id && c1.action_taker_id == change.action_taker_id && c1.password == change.password )
    {
      flag1 =1
  
     c1.slot_data = change.slot_data 
    c1.slot_time = change.slot_time}})
console.log(fulldata)

if(flag1 == 1)
   {
   await User.updateMany({main_date:change.date,action_taker_id:change.action_taker_id},{$set: {data:fulldata.data}})   
   return {"success":"true"}
   }
else
  {
    return {"success":"false"}
  }
  
  
  }
  



async function remove (username) {
  await User.deleteOne({ username })
}

async function convert(date)

    {
    var myDate = new Date(date);
    let neww = myDate.setDate(myDate.getDate() + 1)
    var days =0;
    var newDate = new Date(neww+days*24*60*60*1000);
    let newDate1=((JSON.stringify(newDate).split("T")))
    newDate1 = newDate1[0]+'"'
    return newDate1
    }



