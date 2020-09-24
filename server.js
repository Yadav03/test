const express = require('express')
const eslint = require('eslint')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const principal_users_api = require('./api/principal_users_api')
const dean_users_api = require('./api/dean_users_api')
const action_taker_users_api = require('./api/action_taker_users_api')
const end_user_users_api = require('./api/end_user_users_api')
const attendance_data_schema_api = require('./api/attendance_data_schema_api')
const attendance_data_api = require('./api/attendance_data_api')
const leave_requests_api = require('./api/leave_requests_api')
const leave_schemas_api = require('./api/leave_schemas_api')
const spoofing_api = require('./api/spoofing_api')
const temperature_api = require('./api/temperature_api')
const holiday_schemas_api = require('./api/holiday_schemas_api')
var cors = require('cors')

const auth1_SIEORA = require('./auth/auth_SIEORA')
const auth_PRINCIPAL = require('./auth/auth_principal')
const auth_DEAN = require('./auth/auth_dean')
const auth_ACTION_TAKER = require('./auth/auth_action_taker')
const middleware = require('./middleware')

const port = process.env.PORT || 5005

const app = express()

app.use(cors())
// app.use(bodyParser.json())

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser())

app.post('/token', auth1_SIEORA.login)
app.post('/login1', principal_users_api.validateUser)
app.post('/login2', principal_users_api.validateUser_principal)
app.post('/login3', dean_users_api.validateUser)
app.post('/login4', action_taker_users_api.validateUser)
app.post('/login5', end_user_users_api.validateUser)


app.get('/principal', auth1_SIEORA.ensureUser, principal_users_api.listUser)
app.get('/principal/:id', auth1_SIEORA.ensureUser,principal_users_api.getUser)
app.post('/principal', auth1_SIEORA.ensureUser, principal_users_api.createUser)
app.put('/principal/:id', auth1_SIEORA.ensureUser,principal_users_api.editUser)
app.delete('/principal/:id', auth1_SIEORA.ensureUser, principal_users_api.deleteUser)

app.get('/dean',  dean_users_api.listUser)
app.get('/dean/:id', auth_PRINCIPAL.ensureUser,dean_users_api.getUser)
app.post('/dean', auth_PRINCIPAL.ensureUser, dean_users_api.createUser)
app.put('/dean/:id', auth_PRINCIPAL.ensureUser,dean_users_api.editUser)
app.delete('/dean/:id', auth_PRINCIPAL.ensureUser, dean_users_api.deleteUser)

app.get('/action_taker', auth_DEAN.ensureUser, action_taker_users_api.listUser)
app.get('/action_taker/:id', auth_DEAN.ensureUser,action_taker_users_api.getUser)
app.post('/action_taker', auth_DEAN.ensureUser, action_taker_users_api.createUser)
app.put('/action_taker/:id', auth_DEAN.ensureUser,action_taker_users_api.editUser)
app.delete('/action_taker/:id', auth_DEAN.ensureUser, action_taker_users_api.deleteUser)

app.get('/end_user', auth_ACTION_TAKER.ensureUser, end_user_users_api.listUser)
app.get('/end_user/:id', auth_ACTION_TAKER.ensureUser,end_user_users_api.getUser)
app.post('/end_user_group', auth_ACTION_TAKER.ensureUser,end_user_users_api.getUser_group)
app.post('/end_user', auth_ACTION_TAKER.ensureUser, end_user_users_api.createUser)
app.put('/end_user/:id', auth_ACTION_TAKER.ensureUser,end_user_users_api.editUser)
app.delete('/end_user/:id', auth_ACTION_TAKER.ensureUser, end_user_users_api.deleteUser)
app.post('/encodings_get_device', end_user_users_api.get_embeddings)


app.post('/attendance_data_schema_get', attendance_data_schema_api.get)
app.post('/attendance_data_schema', auth_ACTION_TAKER.ensureUser,attendance_data_schema_api.createUser)

// app.get('/attendance_data', attendance_data_api.listUser)
app.post('/attendance_data_get_device',attendance_data_api.get_special)
app.post('/attendance_data_device_create',attendance_data_api.create_special)
app.post('/attendance_data_principal',attendance_data_api.get_principal_report)
app.post('/attendance_data_dean',attendance_data_api.get_dean_report)
app.post('/attendance_data_action_taker',attendance_data_api.get_action_taker_report)
app.post('/attendance_data_student',attendance_data_api.get_student_report)
app.put('/attendance_data_end_user_edit', attendance_data_api.edit_student_report)
app.put('/attendance_data_edit_device', attendance_data_api.editUser)
app.delete('/attendance_data/', attendance_data_api.deleteUser)


app.post('/leave_request_create',leave_requests_api.create)
app.post('/leave_request_get_action_taker',leave_requests_api.get_action_taker_level)
app.post('/leave_request_get_end_user',leave_requests_api.get_end_user_level)
app.post('/leave_request_get_end_user_granted',leave_requests_api.get_end_user_level_granted)
app.put('/leave_request_edit/:id',leave_requests_api.edit)

app.post('/leave_schemas_create',leave_schemas_api.create)
app.post('/leave_schemas_get_action_taker',leave_schemas_api.get_action_taker_level)
app.put('/leave_schemas_edit/:id',leave_schemas_api.edit)

app.post('/holiday_schemas_create',holiday_schemas_api.create)
app.post('/holiday_schemas_get_action_taker',holiday_schemas_api.get_action_taker_level)
app.put('/holiday_schemas_edit/:id',holiday_schemas_api.edit)

app.post('/spoofing_create',spoofing_api.create)
app.post('/spoofing_get_action_taker',spoofing_api.get_action_taker_level)
app.put('/spoofing_edit/:id',spoofing_api.edit)

app.post('/temperature_create',temperature_api.create)
app.post('/temperature_get_action_taker',temperature_api.get_action_taker_level)
app.put('/temperature_edit/:id',temperature_api.edit)




app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port,"0.0.0.0", () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}



