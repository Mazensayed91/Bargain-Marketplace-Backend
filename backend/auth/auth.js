import jwt from 'jsonwebtoken'
process.env.SECRET_KEY = 'secret'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length <500;

        let decodedData;

        
        decodedData = jwt.verify(token, process.env.SECRET_KEY);
        req.unique_id = decodedData?.id;
        
        next();

    } catch (error) {
        console.log(error)
    }
}


export default auth;