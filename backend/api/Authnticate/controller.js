const {User} = require('../../models')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = 'secret'

module.exports.register = async (req, res) => {
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
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
                    res.json({msg: user.email +' registered'})
                }).catch(err => {
                    res.status(500).json({msg: err.message})
                })
            })
        }
        else
            res.status(400).json({msg: user.email+"User already exist"})
    }).catch(err => {
        console.log(err)
        res.status(500).json({msg: err.message})
    })
};


module.exports.login = async (req, res) => {
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
};

// module.exports.main = async (req, res) => {
//     const user = await User.findAll();
//     res.json(user);
// };
