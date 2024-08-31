import { json } from "stream/consumers";
import prisma from "../db";



//get all products that belong to the user

export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id, 
        }, 
        include: {
           Product: true
        }
    })

    res.json({ products: user.Product })
}

//get one product

export const getProduct = async (req, res) => {
    const id = req.params.id
     
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({ data: product })
}