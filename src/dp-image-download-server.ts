import express = require('express')
import * as path from 'path'
import * as fs from 'fs-sync'
import { Provider } from './provider';
var http = require('http');
var https = require('https');
const currentPath = path.resolve(path.dirname(''))

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(currentPath));

const httpPort = fs.readJSON(path.join(currentPath, '.env.json')).httpPort
const httpsPort = fs.readJSON(path.join(currentPath, '.env.json')).httpsPort


app.get('/getImagePathFromHTML', (req, res) => {
  const currentHTML = fs.read(path.join(currentPath, '../current.html'))

  const imagePath = Provider.getImagePath(currentHTML)
  res.json({
    path: imagePath
  })
})

app.get('/downloadImage/id/:id', async (req, res) => {
  const basePath = 'https://fance-stiftung.de/api/events/img/'
  const path = `${basePath}${req.params.id}`
  const downloadResult = await Provider.downloadImage(path, "fritz")
  console.log(JSON.stringify(downloadResult))
})
var httpServer = http.createServer(app);
httpServer.listen(httpPort);
console.log(`http dp-dates-server listening on: ${httpPort}`)

const landscape = fs.readJSON(path.join(currentPath, '.env.json')).landscape

if (landscape === 'real') {

  const keyFile = fs.readJSON(path.join(currentPath, '.env.json')).certificatePrivateKeyFile
  const certFile = fs.readJSON(path.join(currentPath, '.env.json')).certificateFile

  var privateKey = fs.read(keyFile)
  var certificate = fs.read(certFile)

  var credentials = { key: privateKey, cert: certificate };


  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(httpsPort);
  console.log(`https listening on: ${httpsPort}`)
}