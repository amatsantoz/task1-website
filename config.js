const fs = require('fs')
const key = fs.readFileSync('E:/Tugasnodejs/task1-website/certs/key.pem')

module.exports = {
  secret: key
}
