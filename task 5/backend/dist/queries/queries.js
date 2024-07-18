"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const selectdata = () => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query('SELECT * FROM form');
    return data;
});
const insertdata = (fname, lname, dob, pnumber, Adress, images) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`INSERT INTO form (fname,lname,dob,pnumber,Adress,images) VALUES(?,?,?,?,?,?)`, [fname, lname, dob, pnumber, Adress, images]);
    return [data];
});
const putdata = (fname, lname, dob, pnumber, Adress, images, dataId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`UPDATE form SET fname=?,lname=?,dob=?,pnumber=?,Adress=?,images=? WHERE id=?`, [fname, lname, dob, pnumber, Adress, images, dataId]);
});
const deleteuser = (dataId) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`DELETE FROM form WHERE id =?`, [dataId]);
});
const searchuser = (datafetch, l, startindex) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(` SELECT * FROM form  WHERE  fname LIKE '%${datafetch}%' OR lname LIKE '%${datafetch}%' OR dob LIKE '%${datafetch}%' OR pnumber LIKE '%${datafetch}%' OR adress LIKE '%${datafetch}%'  LIMIT ${l} OFFSET ${startindex} `);
    return [data];
});
const orderdata = (sortby, sortquery, l, startindex) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`SELECT * FROM form ORDER BY ${sortquery} ${sortby} LIMIT ${l} OFFSET ${startindex} `);
    return [data];
});
const sortsearchquery = (datafetch, l, startindex, sortby, sortquery) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(` SELECT * FROM form  WHERE  fname LIKE '%${datafetch || ""}%' OR lname LIKE '%${datafetch || ""}%' OR dob LIKE '%${datafetch || ""}%' OR pnumber LIKE '%${datafetch || ""}%' OR adress LIKE '%${datafetch || ""}%' ORDER BY ${sortquery} ${sortby}  LIMIT ${l} OFFSET ${startindex} `);
    console.log(data);
    return data;
});
const totalcalc = (datafetch) => __awaiter(void 0, void 0, void 0, function* () {
    const [totalrecords] = yield db_1.default.query(` SELECT count (* ) as count FROM form  WHERE  fname LIKE '%${datafetch || ""}%' OR lname LIKE '%${datafetch || ""}}%' OR dob LIKE '%${datafetch || ""}%' OR pnumber LIKE '%${datafetch || ""}%' OR adress LIKE '%${datafetch || ""}%' OR images LIKE '%${datafetch}'  `);
    const [{ count }] = totalrecords;
    console.log(totalrecords);
    return count;
});
const filesUploaded = (filename, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query('INSERT INTO files (Files, user_id) VALUES (?, ?)', [filename, user_id]);
    return [data];
});
const getUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`SELECT * FROM files where user_id=?`, [user_id]);
    return data;
});
const updateuser = (filename, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const [data] = yield db_1.default.query(`UPDATE files SET Files =? where user_id=?`, [filename, user_id]);
    return [data];
});
exports.default = { selectdata, insertdata, putdata, deleteuser, searchuser, orderdata, sortsearchquery, totalcalc, filesUploaded, getUser, updateuser };
//# sourceMappingURL=queries.js.map