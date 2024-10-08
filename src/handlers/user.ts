import { create } from "domain"
import prisma from "../db.js"
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js"


export const createNewUser = async (req, res, next) =>{

    try{
        const user = await prisma.user.create({
            data:{
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })
        
            const token = createJWT(user)
            res.json({ token })

    } catch(e){
        e.type = 'input'
        next(e)
    }
}

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()  
} 

export const signIn = async (req, res) => {

    //finds user in database 
    const user = await prisma.user.findUnique({
        where: { username: req.body.username }, 
    })
    
    //compares password in request to the database 
    const isValid = await comparePasswords(req.body.password, user.password)

    if(!isValid){
        res.status(401)
        res.send("Invalid username or password")
        return 
    }


    const token = createJWT(user)
    res.json({ token })
}

