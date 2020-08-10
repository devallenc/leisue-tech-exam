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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user_1 = __importDefault(require("../models/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (req, res) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, username, email, password, suspend, userExists, hashedPassword, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, username = _a.username, email = _a.email, password = _a.password, suspend = _a.suspend;
                        return [4 /*yield*/, user_1.default.findOne({ $or: [{ username: username, email: email }] }).exec()];
                    case 1:
                        userExists = _b.sent();
                        console.log('userExists', userExists);
                        if (userExists) {
                            return [2 /*return*/, res.status(500).json({ message: 'User already exists!' })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 11)];
                    case 2:
                        hashedPassword = _b.sent();
                        req.body.password = hashedPassword;
                        return [4 /*yield*/, user_1.default.create(req.body)];
                    case 3:
                        newUser = _b.sent();
                        if (newUser) {
                            res.status(200).json({ message: " User added successfully" });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.log(error_1);
                        res.status(500).json({ message: "Something went wrong" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    };
    UserController.prototype.getUsers = function (req, res) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var pageSize, currentPage, users, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        pageSize = Number(req.query.pageSize);
                        currentPage = Number(req.query.page);
                        return [4 /*yield*/, user_1.default.find().skip(pageSize * (currentPage - 1)).limit(pageSize).exec()];
                    case 1:
                        users = _a.sent();
                        console.log('users', users);
                        if (users) {
                            res.status(200).json({ data: users });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        res.status(500).json({ message: "Something went wrong" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    UserController.prototype.updateUser = function (req, res) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, userUpdated, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, user_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true }).exec()];
                    case 1:
                        userUpdated = _a.sent();
                        console.log('users', userUpdated);
                        if (userUpdated) {
                            res.status(200).json({ data: userUpdated });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        res.status(500).json({ message: "Something went wrong" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    UserController.prototype.deleteUser = function (req, res) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var id, userDeleted, findUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        return [4 /*yield*/, user_1.default.findByIdAndRemove(id).exec()];
                    case 1:
                        userDeleted = _a.sent();
                        console.log('userDeleted', userDeleted);
                        return [4 /*yield*/, user_1.default.findById(id).exec()];
                    case 2:
                        findUser = _a.sent();
                        console.log('findUser', findUser);
                        if (userDeleted) {
                            res.status(200).json({ data: userDeleted });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        res.status(500).json({ message: "Something went wrong" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); })();
    };
    return UserController;
}());
exports.UserController = UserController;
