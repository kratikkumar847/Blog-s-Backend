const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req,res) =>{
    console.log(req);
    const usersignup = {
      name: req.body.name,
      userID: req.body.userID,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    }

    try {
        const newUser = await User.create(usersignup);
          const ResponseOfNewUser = {
            name: createdUser.name,
            userID: createdUser.userID,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
          }

        return res.status(201).send({
          success: true,
          status: 201,
          message: `${createdUser.name} , Added Successully !`,
          user: ResponseOfNewUser,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
          success: false,
          message: 'Internal Server Error ,when Insert User !',
        })
        
    }
}

const signin = async (req, res) => {
  try {
    var user = await User.findOne({ userID: req.body.userID })
  } catch (err) {
    console.log(err.message)
  }

  if (user == null) {
    return res.status(400).send("User ID Doesn't Exist !")
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

  if (!isPasswordValid) {
    return res.status(401).send('Invalid Password')
  }

  const token = jwt.sign({ id: user.userID }, process.env.SECRET, {
    expiresIn: '2h',
  })

  return res.status(200).send({
    success: true,
    status: 200,
    message: `${user.userID} login Successfully !`,
    user: {
      name: user.name,
      userID: user.userID,
      email: user.email,
      accessToken: token,
    },
  })
}


module.exports = {signup, signin}