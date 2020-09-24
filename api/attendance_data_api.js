const Attendance_data1 = require('../models/attendance_data')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  get_special,
  listUser,
  editUser,
  deleteUser,
  get_principal_report,
  get_dean_report,
  get_action_taker_report,
  get_student_report,
  edit_student_report,
  create_special
})

async function get_special (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const deviceid = req.body.device_id
  const password = req.body.password
  const actiontakerid = req.body.action_taker_id
  const date = req.body.date

  const attendance_data1 = await Attendance_data1.get_special_device(deviceid,password,actiontakerid,date)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}

async function create_special (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const date = req.body.date
  const day = req.body.day
  const actiontakerid = req.body.action_taker_id
  const deanId = req.body.dean_id
  const principalId = req.body.principal_id


  const attendance_data1 = await Attendance_data1.create_special(date,day,actiontakerid,deanId,principalId)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}

async function get_principal_report (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const start_date = req.body.startDate
  const end_date = req.body.endDate
  const principalId = req.body.principal_id   

  const attendance_data1 = await Attendance_data1.get_principal_report(start_date,end_date,principalId)
  if (!attendance_data1) return next()
// console.log(attendance_data1.length)
  res.json(attendance_data1)
}


async function get_dean_report (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const start_date = req.body.startDate
  const end_date = req.body.endDate
  const principalId = req.body.principal_id   
  const deanId = req.body.dean_id  

  const attendance_data1 = await Attendance_data1.get_dean_report(start_date,end_date,principalId,deanId)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}

async function get_action_taker_report (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const start_date = req.body.startDate
  const end_date = req.body.endDate
  const principalId = req.body.principal_id   
  const deanId = req.body.dean_id  
  const actiontakerId = req.body.action_taker_id 
  // console.log(req.body.startDate)
  const attendance_data1 = await Attendance_data1.get_action_taker_report(start_date,end_date,principalId,deanId,actiontakerId)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}

async function get_student_report (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  //  console.log("fvevf")
  const start_date = req.body.startDate
  const end_date = req.body.endDate
  const principalId = req.body.principal_id   
  const deanId = req.body.dean_id  
  const actiontakerId = req.body.action_taker_id 
  const enduserId = req.body.end_user_id 

  const attendance_data1 = await Attendance_data1.get_student_report(start_date,end_date,principalId,deanId,actiontakerId,enduserId)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}

async function edit_student_report (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  const start_date = req.body.startDate
  const principalId = req.body.principal_id   
  const deanId = req.body.dean_id  
  const actiontakerId = req.body.action_taker_id 
  const change = req.body.change 
  // const enduserId = req.body.end_user_id 
  const end_date = req.body.endDate

  const attendance_data1 = await Attendance_data1.edit_student_report(start_date,end_date,principalId,deanId,actiontakerId,change)
  if (!attendance_data1) return next()

  res.json(attendance_data1)
}


async function listUser (req, res, next) {

  // if (!req.isAdmin) return forbidden(next)
  const { offset = 0, limit = 25, tag } = req.query

  const attendance_data1 = await Attendance_data1.list_special({
    offset: Number(offset),
    limit: Number(limit),
    tag
  })

  res.json(attendance_data1)
}


async function editUser (req, res, next) {
  //  if (!req.isAdmin) return forbidden(next)
  // const deviceid = req.body.device_id
  // const password = req.body.password
  // const actiontakerid = req.body.action_taker_id
  // const date = req.body.date
  const change = req.body
  // console.log(deviceid)
   const attendance_data1 = await Attendance_data1.edit_special_device(change)

  res.json(attendance_data1)
}

async function deleteUser (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)

  await Attendance_data1.remove(req.params.id)
  res.json({ success: true })
}


function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}


