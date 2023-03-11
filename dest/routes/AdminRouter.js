"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const userController_1 = __importDefault(require("../controllers/userController"));
const AdminRouter = express_1.default.Router();
const adminController_1 = __importDefault(require("../controllers/adminController"));
const controller = new adminController_1.default(new userController_1.default());
AdminRouter.get('/', adminAuth_1.default, controller.admin);
AdminRouter.get('/add', adminAuth_1.default, controller.getAddAnime);
AdminRouter.post('/add', adminAuth_1.default, controller.postAddAnime);
AdminRouter.get('/update/:id', adminAuth_1.default, controller.getUpdateAnime);
AdminRouter.post('/update/:id', adminAuth_1.default, controller.postUpdateAnime);
AdminRouter.post('/update/:id/episodes/add', adminAuth_1.default, controller.addEpisode);
AdminRouter.post('/update/:id/:episodeID/delete', adminAuth_1.default, controller.deleteEpisode);
AdminRouter.post('/delete/:id', adminAuth_1.default, controller.deleteAnime);
AdminRouter.get('/users', adminAuth_1.default, controller.users);
AdminRouter.post('/users/delete/:id', adminAuth_1.default, controller.deleteUser);
AdminRouter.get('/users/update/:id', adminAuth_1.default, controller.getUpdateUser);
AdminRouter.post('/users/update/:id', adminAuth_1.default, controller.postUpdateUser);
exports.default = AdminRouter;
