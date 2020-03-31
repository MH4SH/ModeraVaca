const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    

    if(!authHeader)
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "No token provided"})

    const parts = authHeader.split(' ');
    console.log(parts);
    console.log(parts.length !== 2);

    if(parts.length !== 2)
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token error"})

    const [scheme, token] = parts;

    if(!/Bearer$/i.test(scheme))
        return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token malformatted"})

    jwt.verify(token, process.env.HASH_1_SECRET, (err, decoded) => {
        if(err)
            return res.status(401).json({statusCode: 401, error: "Unauthorized", message: "Token invalid"})

        req.userId = decoded.id;
        req.userType = decoded.type;
        return next();
    })
}