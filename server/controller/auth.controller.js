//import User from '../models/user.model.js'
const User = require('../models/user.model.js');
//import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken');
//import expressJwt from 'express-jwt'
//import { expressjwt } from "express-jwt";
const {expressjwt} = require('express-jwt');
//import config from './../../config/config.js'
//const config = require('../');
//const config = require('dotenv').config({ path : "../config.env"});
const config = require('dotenv').config();



const signin = async (req, res) => { 
try {
let user = await User.findOne({ "email": req.body.email }) 
if (!user)
return res.status('401').json({ error: "User not found" }) 
if (!user.authenticate(req.body.password)) {
return res.status('401').send({ error: "Email and password don't match." })
}
const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET) 
res.cookie('t', token, { expire: new Date() + 9999 }) 
return res.json({
token, 
user: {
_id: user._id, 
name: user.name,
email: user.email 
}
})
} catch (err) {
return res.status('401').json({ error: "Could not sign in" }) 
}
}

const signout = (req, res) => { 
res.clearCookie("t")
return res.status('200').json({ 
message: "signed out"
}) 
}
const requireSignin = expressjwt({ 
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"],
userProperty: 'auth'
})
const hasAuthorization = (req, res, next) => { 
const authorized = req.profile && req.auth
&& req.profile._id ==  req.auth._id 
if (!(authorized)) {
return res.status('403').json({ 
error: "User is not authorized"
}) 
} 
next()
}
module.exports ={ signin, signout, requireSignin, hasAuthorization }