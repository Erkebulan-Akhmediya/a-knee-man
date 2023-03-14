"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class signInController {
    getMethod(req, res) {
        res.render('auth/sign-in');
    }
    async postMethod(req, res) {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        try {
            if (req.body.firstName == 'Kaguya' && req.body.lastName == 'Shinomiya' && req.body.password == 'admin') {
                res.clearCookie('adminToken');
                res.cookie('adminToken', jsonwebtoken_1.default.sign('admin', secret), { maxAge: 15 * 60 * 1000 });
                res.redirect('/admin');
                return;
            }
            const foundUser = await Users_1.default.find({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            });
            const token = jsonwebtoken_1.default.sign(foundUser.toString(), secret);
            res.clearCookie('token');
            res.cookie('token', token, { maxAge: 15 * 60 * 1000 });
            res.redirect('/profile');
        }
        catch (e) {
            res.send('Incorrect User Data');
        }
    }
}
exports.default = signInController;
