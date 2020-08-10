"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var users_1 = require("../controllers/users");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.userController = new users_1.UserController();
    }
    UserRoutes.prototype.route = function (app) {
        var _this = this;
        app.get('/api', function (req, res) {
            _this.userController.getUsers(req, res);
        });
        app.post('/api', function (req, res) {
            _this.userController.createUser(req, res);
        });
        app.patch('/api/:id', function (req, res) {
            _this.userController.updateUser(req, res);
        });
        app.delete('/api/:id', function (req, res) {
            _this.userController.deleteUser(req, res);
        });
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
