const express = require('express');
const simpleProxy = require('./simpleProxy');
const cors = require('cors');

const port = 3000
const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
//app.use(express.static('public'))
app.all('/music-api/*', async (req, res) => simpleProxy.get(req, res))

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
