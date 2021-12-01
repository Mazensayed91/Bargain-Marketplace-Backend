const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {User} = require('../models');
const {encrypt, decrypt} = require('./EncryptionHandler');

process.env.SECRET_KEY = 'secret'

router.get('/', async (req, res) =>{
    //res.send("Hello World");
    const user = await User.findAll();
    res.json(user);
});

router.post("/", async(req, res) => {
    let personInfo = req.body;
    await User.create(personInfo);
    res.json(personInfo);
});

router.post("/register", (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        //unique_id: req.body.unique_id,
        password: req.body.password,
        passwordconf: req.body.passwordconf,
        created: today

    }
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                userData.password = hash
                 User.create(userData).then( user => {
                    res.json({status: user.email +'registered'})
                }).catch(err => {
                    res.send('error: '+ err)
                })
            })
        }
        else
            res.json({error: user.email+"User already exist"})
    }).catch(err => {
        res.send('error: '+ err)
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user)
        {
            if(bcrypt.compareSync(req.body.password, user.password))
            {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }
        }
        else
            res.status(400).json({error: "User does not exist"})
    }).catch(err => {
        res.status(400).json({error: err})
    })
})



/*

router.post('/', (req, res, next) =>{
    let personInfo = req.body;

    if(!personInfo.email || !personInfo.username || !personInfo.password || personInfo.passwordconf)
        res.send();
    
    else
    {
        if(personInfo.password == personInfo.passwordconf)
        {
            User.findOne({email: personInfo.email}, (err, data) => {
                if(!data)
                {
                    let c;
                    User.findOne({}, (err, data) => {
                        if(data)
                            c = data.unique_id+1;
                        
                        else
                            c = 1;
                        
                        let newPerson = new User({
                            unique_id:c,
                            email: personInfo.email,
                            username: personInfo.username,
                            password: personInfo.password,
                            passwordconf: personInfo.passwordconf
                        });

                        newPerson.save((err, Person) => {
                            if(err)
                                console.log(err);
                            else
                                console.log('Success');
                        });
                    }).sort({ _id: -1}).limit(1);
                    res.send({"Success": "You are registered, you can login now"});
                }
                else
                    res.send({"Success": "Email is already used."});

            });
        }
        else
            res.send({"Success": "password is not matched"});

    }
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email}, (err, data) => {
        if(data)
        {
            if(data.password == req.body.password)
            {
                req.session.userId = data.unique_id;
                res.send({"Sucess": "Success!"});
            }
            else
                res.send({"Success": "Wrong password!"});
        }
        else
            res.send({"Success": "This Email Is not registered!"});
    });
});

router.get('/logout', (req, res, next) => {
    if(req.session)
    {
        req.session.destroy((err) => {
            if(err)
                return next(err);
            else
                return res.redirect('/');
        });
    }
});

router.get('/forgetpass', (req, res, next) => {
    //ui of forget pass
    res.render("forget.ejs");
});

router.post('/forgetpass', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, data) => {
        if(!data)
            res.send({"Success": "This Email isn't registered"});
        else
        {
            if(req.body.password == req.body.passwordconf)
            {
                data.password = req.body.password;
                data.passwordconf = req.body.passwordconf;

                data.save((err, Person) => {
                    if(err)
                        console.log(err);
                    else
                        console.log("success");

                    res.send({"Success": "Password changed!"});
                });
            }
            else
                res.send({"Success": "Password doesn't matched!"});
        }
    });
});*/

module.exports = router;