"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
class signUpController {
    getMethod(req, res) {
        res.render('auth/sign-up');
    }
    async postMethod(req, res) {
        await Users_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        res.redirect('/sign-in');
    }
}
exports.default = signUpController;
