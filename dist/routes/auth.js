"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var auth_1 = require("../controllers/auth");
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this.authController = new auth_1.AuthController();
    }
    AuthRoutes.prototype.route = function (app) {
        var _this = this;
        app.post('/api/login', function (req, res) {
            _this.authController.login(req, res);
        });
    };
    return AuthRoutes;
}());
exports.AuthRoutes = AuthRoutes;
