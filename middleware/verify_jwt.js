const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    
    if (req.headers.authorization || req.headers.Authorization) {
        
        const token = req.headers.authorization;
        
        console.log(token);
        if (token) {
            jwt.verify(token, process.env.JWT_MAGIC, (err, decoded) => {
                if (err) {
                    
                    return res.status(401).json({
                        status: "Unauthorized",
                        message: "Invalid token",
                    });
                }
                req.id = decoded.user_info.id;
                req.role = decoded.user_info.role;
                next();
            });
        }
    }
};



module.exports = verifyToken;
