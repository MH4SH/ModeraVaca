const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    

    if(!authHeader)
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "No token provided"})

    const parts = authHeader.split(' ');

    if(parts.length !== 2)
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token error"})

    const [scheme, token] = parts;

    if(!/Bearer$/i.test(scheme))
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token unformatted"})

    jwt.verify(token, process.env.HASH_1_SECRET, (err, decoded) => {
        if(err)
            return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token invalid"})
            
        
        req._userAuthenticate = decoded;

        return next();
    })
}