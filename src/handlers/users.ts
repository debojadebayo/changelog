import { create } from "domain"
import prisma from "../db"
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"


export const createNewUser = async (req, res) =>{
    const hash = await hashPassword(req.body.password)

    const user = await prisma.user.create({
        data:{
            username: req.body.username,
            password: hash
        }
    })

    const token = createJWT(user)
    res.json({ token })
}

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()  
} 

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { username: req.body.username }, 
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if(!isValid){
        res.status(401)
        res.send("Invalid username or password")
        return 
    }


    const token = createJWT(user)
    res.json({ token })
    }
    //take the req.body.password  & username and compare to the database 

}