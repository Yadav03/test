const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer');

var cors = require('cors')


const middleware = require('./middleware')

const port = process.env.PORT || 3000

const app = express()

app.use(cors())
// app.use(bodyParser.json())

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser())


app.post('/sendmail', (req, res) => {
  var data = req.body;
  var smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
  user: 'yadavaprasath@gmail.com',
  pass: 'yadavaprasath@123'
  }
  });
  var mailOptions = {
  from: data.email,
  // replyto: data.email,
  to: data.to,
  subject: data.title,
  html: `<p>${data.message}</p>
  <p>${data.image}</p>`,
  attachments: [{
    filename: 'text1.txt',
    content: 'hello world!'
}]
  };
  smtpTransport.sendMail(mailOptions,
  (error, response) => {
  if (error) {
  res.status(400).send(error)
  } else {
  res.send(response)
  }
  smtpTransport.close();
  });
  })



app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port,"0.0.0.0", () =>
  console.log(`Server listening on port ${port}`)
)

if (require.main !== module) {
  module.exports = server
}



