const http = require('http')
const porta = process.env.PORT || 3000
const app = require('./app')

const server = http.createServer(app)
server.listen(porta, () => console.log('http://localhost:%d', porta))