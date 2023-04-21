import User from '../models/userData.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const secretKey = crypto.randomBytes(64).toString('hex');

export async function signup(req, res, next) {
    const {name, email, password} = req.body;
    try {
        const userExists = await User.findOne({email: email});
        if(userExists){
           return next(new Error("User already exist!")); 
        }
        const user = await User.create({name, email, password});
        const token = Jwt.sign({...user, password: '' }, secretKey);
        return res.json({ success: true, data: token });
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new Error("Username or password is not valid!"));
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return next(new Error("Username or password is not valid!"));
        }
        
        const token = Jwt.sign({...user, password: '' }, secretKey);
        return res.json({ success: true, data: token });
    } catch (error) {
        return next(error);
    }
}