const Data1 = require('./tcs_task')
const autoCatch = require('./lib/auto-catch')

module.exports = autoCatch({
  listData,
  createData,
})


async function listData (req, res, next) {

  const data1= await Data1.list()

  res.json(data1)
}

async function createData (req, res, next) {
  
  const data1= await Data1.create(req.body)
  res.json(data1)
}




