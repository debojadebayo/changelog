import { error } from "console"
import { Router } from "express"
import { body, validationResult } from "express-validator"
import { handleInputErrors } from "./modules/middleware.js"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./handlers/product.js"
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update.js"

const router = Router()


//generic error handler for async errors, uses promise resolve. 
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}
//Product routes 

router.get("/product", asyncHandler(getProducts))

router.get("/product/:id", asyncHandler(getProduct))

router.put("/product/:id", body("name"), handleInputErrors, (req, res) => {});

router.post("/product", body("name").isString(), handleInputErrors, asyncHandler(createProduct))

router.delete("/product/:id", asyncHandler(deleteProduct))

//update routes 

router.get("/update", asyncHandler(getUpdates))

router.get("/update/:id", asyncHandler(getOneUpdate))

router.put("/update/:id", 
    body("title").optional().isString(),
    body("body").optional().isString(),
    body("status").optional().isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
    body("version").optional().isString(),
    handleInputErrors,
    asyncHandler(updateUpdate)
);

router.post("/update", 
    body("title").isString(),
    body("body").isString(),
    body("productId").isString(),
    handleInputErrors,
    asyncHandler(createUpdate)
)

router.delete("/update/:id", asyncHandler(deleteUpdate));


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

router.use((err, req, res, next) => {
    console.error(err)
    if (err.type === 'input') {
      res.status(400).json({ message: "Invalid input data" })
    } else if (err.type === 'auth') {
      res.status(401).json({ message: "You're not authorised" })
    } else if (err.type === 'db') {
      res.status(500).json({ message: "Something went wrong in the database" })
    } else {
      res.status(500).json({ message: "An unexpected error occurred" })
    }
  })

export default router
