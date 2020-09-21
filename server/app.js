const express = require('express')
const simpleProxy = require('./simpleProxy')

const port = 3000
const app = express()

app.use(express.json());
app.use(express.static('public'))
app.all('/music-api/*', async (req, res) => simpleProxy.get(req, res))

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))