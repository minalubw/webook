import Jwt from "jsonwebtoken";
import User from '../models/usersModel.js';

export async function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = Jwt.verify(token,  process.env.SECRET_KEY);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            res.status(process.env.UNAUTHORIZED).json({ error: 'Invalid token'});
        }
        req.user = user;
        next();
    } catch (e) {
        return next(e);
    }
}