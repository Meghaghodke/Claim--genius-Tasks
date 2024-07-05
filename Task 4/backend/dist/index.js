"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const myrouts_1 = __importDefault(require("./routes/myrouts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use("/v1/formdata", myrouts_1.default);
myrouts_1.default.get('/test', (req, res) => {
    res.status(200).send("<h1>Nodejs Mysql App</h1>");
});
app.use(myrouts_1.default);
db_1.default.query('SELECT 1').then(() => {
    console.log("mysql db connected");
    app.listen(PORT, () => {
        console.log("Server Running");
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map