const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'userToken');
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'unauthorized'
        })
    }
}

module.exports = verifyToken