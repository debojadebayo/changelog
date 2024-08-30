"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
//Product routes 
router.get("/product", function (req, res) {
    res.json({ message: "products" });
});
router.get("/product/:id", function (req, res) { });
router.post("/product", function (req, res) { });
router.put("/product/:id", function (req, res) { });
router.delete("/product/:id", function (req, res) { });
//update routes 
router.get("/update", function (req, res) {
});
router.get("/update/:id", function (req, res) { });
router.post("/update", function (req, res) { });
router.put("/update/:id", function (req, res) { });
router.delete("/update/:id", function (req, res) { });
//update points 
router.get("/updatepoint", function (req, res) { });
router.get("/updatepoint/:id", function (req, res) { });
router.post("/updatepoint", function (req, res) { });
router.put("/updatepoint/:id", function (req, res) { });
router.delete("/updatepoint/:id", function (req, res) { });
exports.default = router;
//# sourceMappingURL=router.js.map