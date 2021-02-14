const express = require('express')
const eslint = require('eslint')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const tcs_task_api = require('./tcs_task_api')

var cors = require('cors')

const middleware = require('./middleware')

const port = process.env.PORT || 5009

const app = express()

app.use(cors())

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(cookieParser())


app.post('/data_create',tcs_task_api.createData)
app.get('/data_list',tcs_task_api.listData)

app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port,"0.0.0.0", () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}



