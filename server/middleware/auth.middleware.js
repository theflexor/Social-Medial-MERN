import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization')

        // check token
        if (!token) {
            return res.status(403).send('Access denied')
        }

        // remove Bearer text
        if (token.startWidth('Bearer ')) {
            token = token.slice(7, tokens.length).trimLeft()
        }

        // checking the validity of the token
        const verified = jwt.verify(token, process.env.SECRED_KEY)
        req.user = verified

        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
