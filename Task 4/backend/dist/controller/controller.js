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
exports.searchsortpage = exports.sortdata = exports.searchquery = exports.deletedata = exports.updatedata = exports.createdata = exports.getdata = void 0;
const queries_1 = __importDefault(require("../queries/queries"));
const getdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selecte = yield queries_1.default.selectdata();
        if (!selecte) {
            return res.status(404).send({
                success: false,
                message: 'No records found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'All student records',
            data: selecte
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all',
            error
        });
    }
});
exports.getdata = getdata;
const createdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, dob, pnumber, Adress } = req.body;
        if (!fname || !lname || !dob || !pnumber || !Adress) {
            return res.status(500).send({
                success: false,
                message: 'please provide all filds'
            });
        }
        const inserted = yield queries_1.default.insertdata(fname, lname, dob, pnumber, Adress);
        if (!inserted) {
            return res.status(404).send({
                success: false,
                message: 'error in insert query',
            });
        }
        res.status(201).send({
            success: true,
            message: 'New Student record Ceated',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in  data',
            error
        });
    }
});
exports.createdata = createdata;
const updatedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Iddata = req.params.id;
        const dataId = parseInt(Iddata);
        if (!dataId) {
            return res.status(404).send({
                success: false,
                message: 'invalid id or provide id'
            });
        }
        const { fname, lname, dob, pnumber, Adress } = req.body;
        const data = yield queries_1.default.putdata(fname, lname, dob, pnumber, Adress, dataId);
        res.status(200).send({
            success: true,
            message: 'form details',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update student api',
            error,
        });
    }
});
exports.updatedata = updatedata;
const deletedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Iddata = req.params.id;
        const dataId = parseInt(Iddata);
        if (!dataId) {
            return res.status(404).send({
                success: false,
                message: 'Please provude id',
            });
        }
        const data = yield queries_1.default.deleteuser(dataId);
        res.status(200).send({
            success: true,
            message: 'data deleated',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete data',
            error,
        });
    }
});
exports.deletedata = deletedata;
const searchquery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datafetch = req.body.datafetch;
        const { limit } = req.query;
        const { offset } = req.query;
        if (!datafetch && !limit && !offset) {
            return res.status(404).send({
                success: false,
                message: 'NOT found',
            });
        }
        const l = parseInt(limit);
        const o = parseInt(offset);
        const startindex = (o - 1) * l;
        const data = yield queries_1.default.searchuser(datafetch, l, startindex);
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data: data[0]
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
});
exports.searchquery = searchquery;
const sortdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sortby } = req.query;
        const { sortquery } = req.query;
        const { limit } = req.query;
        const { offset } = req.query;
        if (!(sortby && sortquery)) {
            return res.status(404).send({
                success: false,
                message: 'Please provide at least one search parameter',
            });
        }
        const l = parseInt(limit);
        const o = parseInt(offset);
        const startindex = (o - 1) * l;
        const data = yield queries_1.default.orderdata(sortby, sortquery, l, startindex);
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data: data[0]
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
});
exports.sortdata = sortdata;
const searchsortpage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { datafetch } = req.query || " ";
        const { limit } = req.query;
        const { offset } = req.query;
        const { sortby } = req.query;
        const { sortquery } = req.query;
        const l = parseInt(limit);
        const o = parseInt(offset);
        const startindex = (o - 1) * l;
        const data = yield queries_1.default.sortsearchquery(datafetch || "", l || 5, startindex || 0, sortby || 'desc', sortquery || 'id');
        const data2 = yield queries_1.default.totalcalc(datafetch || "");
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data: data,
            totalrecords: data2
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
});
exports.searchsortpage = searchsortpage;
//# sourceMappingURL=controller.js.map