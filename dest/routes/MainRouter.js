"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("../models/Users"));
const auth_1 = __importDefault(require("../middleware/auth"));
const Anime_1 = __importDefault(require("../models/Anime"));
const MainRouter = express_1.default.Router();
MainRouter.get('/profile', auth_1.default, async (req, res) => {
    const cart = await Users_1.default.find({ _id: req.body.user.id }, { planning: 1, liked: 1 });
    console.log(cart);
    const planning = [];
    for (let i = 0; i < cart[0].planning.length; i++) {
        let temp = await Anime_1.default.findOne({ _id: cart[0].planning[i] });
        planning.push(temp);
    }
    const liked = [];
    for (let i = 0; i < cart[0].liked.length; i++) {
        let temp = await Anime_1.default.findOne({ _id: cart[0].liked[i] });
        liked.push(temp);
    }
    res.render('profile', {
        user: req.body.user,
        planning: planning,
        liked: liked,
    });
});
MainRouter.get('/', (req, res) => {
    res.redirect('/catalogue');
});
MainRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/sign-in');
});
exports.default = MainRouter;
