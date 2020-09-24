var accountSid =  "AC1ceaeecdd177f508bdea583909dfb5cf"; // Your Account SID from www.twilio.com/console
var authToken =  "d43574953cecb7f3c6bd1f2a92319b71";   // Your Auth Token from www.twilio.com/conso
const client = require('twilio')(accountSid, authToken);


var numbersToMessage = ["+919962037023"]

numbersToMessage.forEach(function(number){
  var message = client.messages.create({
    body: 'sieora sms test',
    from: '+16142891954',
    to: number
  })
  .then(message =>  console.log(message.status))
  .done();
});