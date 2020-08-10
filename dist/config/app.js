"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = require("../routes/user");
var auth_1 = require("../routes/auth");
var MONGO_URL = 'mongodb+srv://admin:admin@cluster0.jhct8.mongodb.net/<dbname>?retryWrites=true&w=majority';
var App = /** @class */ (function () {
    function App() {
        this.userRoutes = new user_1.UserRoutes();
        this.authRoutes = new auth_1.AuthRoutes();
        this.app = express_1.default();
        this.middlewares();
        this.mongoSetup();
        this.userRoutes.route(this.app);
        this.authRoutes.route(this.app);
    }
    App.prototype.middlewares = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    };
    App.prototype.mongoSetup = function () {
        return new Promise(function (resolve, reject) {
            mongoose_1.default
                .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
                .then(function (res) { return resolve(console.log('Connected to MongoDB')); })
                .catch(function (err) { return reject(err); });
        });
    };
    return App;
}());
exports.default = new App().app;
