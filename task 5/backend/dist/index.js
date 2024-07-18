"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const myrouts_1 = __importDefault(require("./routes/myrouts"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.use('/uplods', express_1.default.static(path_1.default.join(__dirname, '../src/', 'uplods')));
app.use("/v1/formdata", myrouts_1.default);
myrouts_1.default.get('/test', (req, res) => {
    res.status(200).send("<h1>Nodejs Mysql App</h1>");
});
db_1.default.query('SELECT 1').then(() => {
    console.log("mysql db connected");
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
        console.log(path_1.default.join(__dirname, '../src/', 'uplods'));
    });
}).catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map