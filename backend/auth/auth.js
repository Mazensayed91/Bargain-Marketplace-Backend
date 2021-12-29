const jwt = require("jsonwebtoken");
process.env.SECRET_KEY = 'secret'

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length <500;

        let decodedData;
        console.log(token);

        
        decodedData = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedData)
        req.unique_id = decodedData?.id;
        
        next();

    } catch (error) {
        console.log("aaaaaaaaa")
        res.status(401).json({error: "UnAuthorized"})
        console.log(req.headers)
        console.log(error)
    }
}


module.exports = auth;