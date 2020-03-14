require('dotenv').config()
const express = require('express')
const cardRouter = require('./card/card-router')
const listRouter = require('./list/list-router')

const app = express()

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
  
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        logger.error(`Unauthorized request to path: ${req.path}`);
      return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
  })

  app.use(cardRouter)
  app.use(listRouter)

app.get('/', (req, res)=> {
    res.send('Hello,world!')
})
module.exports = app