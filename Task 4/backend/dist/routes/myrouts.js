"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const router = express_1.default.Router();
router.post('/create', controller_1.createdata);
router.put('/update/:id', controller_1.updatedata);
router.post('/select', controller_1.searchquery);
router.delete('/delete/:id', controller_1.deletedata);
router.get('/sort', controller_1.sortdata);
router.get('/searching', controller_1.searchsortpage);
exports.default = router;
//# sourceMappingURL=myrouts.js.map