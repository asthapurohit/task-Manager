const express = require('express');
const user = require('../model/user.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


router.get('/', (req, res) => {
    res.send('User routes looking good ;)');
});

router.post('/register', async(req, res) =>{
    const{name, email, password} = req.body;
  try {
      const user = await  user({ name, email, password } = req.body);
      await user.save();
      res.status(201).send({user, message: "User created sucessfully :0" })
    }    
    catch (err) {
      res.status(400).send({ error: err});
    }
});

router.post('/login', async (req, res) => {
    try {const { email, password } = req.body;

    const user = await user.findOne({ email });
    
    if(!user){
        throw new Error('aww unable to login, user not found :/');
    }
     
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('aww unable to login, invalid credentials (sus) :/')
    }
    } catch (err) {
        res.status(400).send({ error: err});
        
    }

    const token = jwt.sign(
      {_id: user._id.toString(),},
      process.env.JWT_SECRET_KEY );
      res.send({user, token, message: "Alright you are logged in :)"});
    
});

module.exports = router;