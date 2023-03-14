"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Anime_1 = __importStar(require("../models/Anime"));
const AdminRouter = express_1.default.Router();
class adminController {
    static controller;
    constructor(controller) {
        adminController.controller = controller;
    }
    async admin(req, res) {
        try {
            const anime = await Anime_1.default.find({}, { name: 1, price: 1 });
            res.render('admin/admin', { anime: anime });
        }
        catch {
            console.log('cannot retrieve records from db');
        }
    }
    getAddAnime(req, res) {
        res.render('admin/addAnime');
    }
    async postAddAnime(req, res) {
        try {
            await Anime_1.default.create({
                name: req.body.name,
                description: req.body.description,
            });
            res.redirect('/admin');
        }
        catch {
            console.log('cannot add anime');
        }
    }
    async getUpdateAnime(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        res.render('admin/updateAnime', {
            anime: anime,
            animeID: req.params.id,
        });
    }
    async postUpdateAnime(req, res) {
        try {
            const animeID = req.params.id;
            const anime = await Anime_1.default.findOne({ _id: animeID });
            await Anime_1.default.findOneAndUpdate({ _id: animeID }, {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.image,
            });
            res.redirect('/admin');
        }
        catch {
            console.log('cannot update anime');
        }
    }
    async addEpisode(req, res) {
        await Anime_1.default.findOneAndUpdate({ _id: req.params.id }, { $push: {
                episodes: new Anime_1.episodeModel({
                    number: req.body.episodeNumber,
                    season: req.body.seasonNumber,
                    url: req.body.episodeUrl,
                }),
            } });
        res.redirect('/admin/update/' + req.params.id);
    }
    async deleteEpisode(req, res) {
        await Anime_1.default.findOneAndUpdate({ _id: req.params.id }, { $pull: {
                episodes: { _id: req.params.episodeID },
            } });
        res.redirect('/admin/update/' + req.params.id);
    }
    async deleteAnime(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        await Anime_1.default.findByIdAndRemove({ _id: anime?._id });
        res.redirect('/admin');
    }
    async users(req, res) {
        adminController.controller.users(req, res);
    }
    async deleteUser(req, res) {
        adminController.controller.deleteUser(req, res);
    }
    async getUpdateUser(req, res) {
        adminController.controller.getUpdateUser(req, res);
    }
    async postUpdateUser(req, res) {
        adminController.controller.postUpdateUser(req, res);
    }
}
exports.default = adminController;
