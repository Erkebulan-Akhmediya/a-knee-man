"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
class userController {
    constructor() { }
    async users(req, res) {
        const users = await Users_1.default.find();
        res.render('admin/users', { users: users });
    }
    async deleteUser(req, res) {
        const user = await Users_1.default.find();
        const userID = req.params.id;
        await Users_1.default.findOneAndDelete({ firstName: user[userID].firstName });
        res.redirect('/admin/users');
    }
    async getUpdateUser(req, res) {
        const user = await Users_1.default.find();
        const userID = req.params.id;
        res.render('admin/updateUsers', {
            user: user[userID],
            userID: req.params.id,
        });
    }
    async postUpdateUser(req, res) {
        const user = await Users_1.default.find();
        const userID = req.params.id;
        await Users_1.default.findOneAndUpdate({ firstName: user[userID].firstName }, { $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            } });
        res.redirect('/admin/users');
    }
}
exports.default = userController;
