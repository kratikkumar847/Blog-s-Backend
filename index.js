require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_DB_URL, () => {
  console.log('mongodb is connected')
})

const authRouter = require("./routes/auth.route")


app.use('/api', authRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
