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
exports.fetchData = exports.UploadFiles = exports.searchsortpage = exports.sortdata = exports.searchquery = exports.deletedata = exports.updatedata = exports.createdata = exports.getdata = void 0;
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
    var _a;
    try {
        const { fname, lname, dob, pnumber, Adress } = req.body;
        const images = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!fname || !lname || !dob || !pnumber || !Adress || !images) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields including the image',
            });
        }
        const inserted = yield queries_1.default.insertdata(fname, lname, dob, pnumber, Adress, images);
        if (!inserted) {
            return res.status(500).send({
                success: false,
                message: 'Error in insert query',
            });
        }
        res.status(201).send({
            success: true,
            message: 'New student record created',
        });
    }
    catch (error) {
        console.error('Error in data handling:', error);
        res.status(500).send({
            success: false,
            message: 'Error in handling data',
            error: error,
        });
    }
});
exports.createdata = createdata;
const updatedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const Iddata = req.params.id;
        const dataId = parseInt(Iddata, 10);
        if (!dataId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid id provided',
            });
        }
        const { fname, lname, dob, pnumber, Adress } = req.body;
        const images = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const data = yield queries_1.default.putdata(fname, lname, dob, pnumber, Adress, images, dataId);
        res.status(200).send({
            success: true,
            message: 'Form details updated successfully',
        });
    }
    catch (error) {
        console.error('Error in updating data:', error);
        res.status(500).send({
            success: false,
            message: 'Error in update student API',
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
            res.status(404).send({
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
const UploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields including the image',
            });
        }
        let filesString = '';
        for (const file of files) {
            filesString += file.filename + ',';
        }
        const existingUser = yield queries_1.default.getUser(user_id);
        console.log(existingUser);
        console.log(filesString);
        if (existingUser.length) {
            filesString += existingUser[0].Files + ',';
        }
        console.log(filesString);
        if (existingUser.length) {
            const updated = yield queries_1.default.updateuser(filesString, user_id);
            if (!updated) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in update query',
                });
            }
        }
        else {
            const inserted = yield queries_1.default.filesUploaded(filesString, user_id);
            if (!inserted) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in insert query',
                });
            }
        }
        res.status(201).send({
            success: true,
            message: 'Files uploaded and records created or updated successfully',
        });
    }
    catch (error) {
        console.error('Error in data handling:', error);
        res.status(500).send({
            success: false,
            message: 'Error in handling data',
            error: error,
        });
    }
});
exports.UploadFiles = UploadFiles;
const fetchData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        console.log(user_id);
        if (!user_id) {
            return res.status(400).send({
                success: false,
                message: 'User ID is required',
            });
        }
        const selecte = yield queries_1.default.getUser(user_id);
        console.log(selecte);
        if (!selecte) {
            return res.status(404).send({
                success: false,
                message: 'No records found',
            });
        }
        const split_img = selecte[0].Files.split(',').slice(0, -1);
        const fileUrls = [];
        for (const file of split_img) {
            fileUrls.push(`http://localhost:3000/uploads/${file}`);
        }
        res.status(200).send({
            success: true,
            message: 'All user records',
            data: split_img,
        });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({
            success: false,
            message: 'Error fetching data',
            error,
        });
    }
});
exports.fetchData = fetchData;
//# sourceMappingURL=controller.js.map