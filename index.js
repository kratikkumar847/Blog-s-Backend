require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json())


mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: 'true',
})
mongoose.connection.on('error', (err) => {
  console.log('err', err)
})
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected')
})



const authRouter = require("./routes/auth.route")
const postrouter = require('./routes/post.route')

app.use('/api', authRouter);
app.use('/api', postrouter)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
