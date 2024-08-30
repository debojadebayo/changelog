import { Router } from "express"

const router = Router()

//Product routes 

router.get("/product", (req,res)=> {
    res.json({message: "products"})
})

router.get("/product/:id", (req, res) => {})

router.post("/product", (req, res) => {});

router.put("/product/:id", (req, res) => {});

router.delete("/product/:id", (req, res) => {});

//update routes 

router.get("/update", (req,res)=> {
})

router.get("/update/:id", (req, res) => {})

router.post("/update", (req, res) => {});

router.put("/update/:id", (req, res) => {});

router.delete("/update/:id", (req, res) => {});

//update points 
router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint/:id", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});


export default router
