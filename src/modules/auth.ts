import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

export const createJWT= (user) => {
    const token = jwt.sign({
        id:user.id,
        username: user.username
    },
    process.env.JWT_TOKEN       
    )
    return token
}

//creating the user 

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password,hash)
}


export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}
// route protection: sits in front on the route and only allows access to that route if JWT present 
export const protect = () => {

return (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: 'Not authorized' });
        return;
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({ message: 'Not valid token' })
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = user
        console.log(user)
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ message: 'Not valid token' })
        return;
    }
};
}
