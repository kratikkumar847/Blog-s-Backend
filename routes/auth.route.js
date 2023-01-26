const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");



// signup - post

router.post("/auth/signup/", auth.signup);



//signin -post
router.post("/auth/signin/", auth.signin)

module.exports = router