import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }
    jwt.verify(token, 'secret', (err, decode) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        req.user = decode
    })
    next()
}
export default verifyToken