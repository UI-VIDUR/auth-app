const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

async function verifyUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized: Missing or invalid authorization header" });
        }

        const token = authHeader.split(' ')[1];

        const decoded = await jwt.verify(token, SECRET_KEY);

        req.body.user = decoded;
        next();

    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            return res.status(400).json({ error: "Invalid or expired token" });
        } else {
            return res.status(500).json({ error: err.message });
        }
    }
}
module.exports = {
    verifyUser,
}
