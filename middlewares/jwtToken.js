const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

function verifyToken(req, res, next) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(403).send({
      message: 'No token Provided',
    })
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'UnAuthorised',
      })
    }

    req.userID = decoded.id
    next()
  })
}

const authJWT = {
  verifyToken: verifyToken,
}

module.exports = authJWT
