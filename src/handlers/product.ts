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

    if(!product){
        res.status(404).json({message: "Product not found"})
    }

    res.json({ data: product })
}

// router.post("/product", body("name").isString(), handleInputErrors, (req, res) => {});


export const createProduct = async (req, res, next) => {

    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name, 
                belongsToId: req.user.id
            }
        })
    
        res.json({ data: product })
        
    } catch (error) {
        next(error)
        
    }


}

export const deleteProduct = async (req, res) => {
    const id = req.params.id 
    console.log(id)

    const product = await prisma.product.delete({
        where: {
            id, 
            belongsToId: req.user.id
        }
    })

    res.json(product)
}


export const updateProduct = async (req, res) => {


    const updatedProduct = await prisma.product.update({
        where: {
                id: req.params.id,
                belongsToId: req.user.id 
            },  
        data: {
            name: req.body.name
        }
    })

    res.json({ data: updatedProduct})
}

