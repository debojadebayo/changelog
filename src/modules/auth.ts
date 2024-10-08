import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

interface User {
    id: string
    username: string
    password?: string
}

export const createJWT = (user: User) => {
    const token = jwt.sign({
        id:user.id,
        username: user.username
    },
    process.env.JWT_SECRET, 
    { expiresIn: "1h"}   
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
export const protect = (req, res, next) => {
    
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: 'Not authorized' });
        return;
    }

    const [, token] = bearer.split(' ')
    console.log(token)

    if (!token) {
        res.status(401)
        res.json({ message: 'Not a valid token' })
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        console.log(user)
        next()
    } catch (e) {
        console.error(e.message)
        res.status(401)
        res.json({ message: 'Token verification failed' })
        return;
    }
}