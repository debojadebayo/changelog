"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var port = 5000;
server_1.default.listen(port, function () {
    console.log("App listening at port: ".concat(port));
});
//# sourceMappingURL=index.js.map