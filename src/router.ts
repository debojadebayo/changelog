import { error } from "console"
import { Router } from "express"
import { body, validationResult } from "express-validator"
import { handleInputErrors } from "./modules/middleware"

const router = Router()

//Product routes 

router.get("/product", (req,res)=> {
    res.json({message: "products"})
})

router.get("/product/:id", (req, res) => {})

router.put("/product/:id", body("name"), handleInputErrors, (req, res) => {});

router.post("/product", body("name").isString(), handleInputErrors, (req, res) => {});

router.delete("/product/:id", (req, res) => {});

//update routes 

router.get("/update", (req, res) => {
    res.json({ message: "updates" });
});

router.get("/update/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `update ${id}` });
});

router.put("/update/:id", 
    body("title").optional().isString(),
    body("body").optional().isString(),
    body("status").optional().isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
    body("version").optional().isString(),
    handleInputErrors,
    (req, res) => {
        const { id } = req.params;
        res.json({ message: `update ${id} updated` });
    }
);

router.post("/update", 
    body("title").isString(),
    body("body").isString(),
    body("productId").isString(),
    handleInputErrors,
    (req, res) => {
        res.json({ message: "update created" });
    }
);


router.delete("/update/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `update ${id} deleted` });
});


//update points 
router.get("/updatepoint", (req, res) => {
    res.json({ message: "update points" });
});

router.get("/updatepoint/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `update point ${id}` });
});

router.post("/updatepoint", 
    body("name").isString(),
    body("description").isString(),
    body("updateId").isString(),
    handleInputErrors,
    (req, res) => {
        res.json({ message: "update point created" });
    }
);

router.put("/updatepoint/:id", 
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
    (req, res) => {
        const { id } = req.params;
        res.json({ message: `update point ${id} updated` });
    }
);

router.delete("/updatepoint/:id", (req, res) => {
    const { id } = req.params;
    res.json({ message: `update point ${id} deleted` });
});

export default router
