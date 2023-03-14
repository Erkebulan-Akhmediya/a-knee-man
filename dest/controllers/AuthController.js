"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class authController {
    static strategy;
    constructor(strategy) {
        authController.strategy = strategy;
    }
    setStrategy(strategy) {
        authController.strategy = strategy;
    }
    getMethod(req, res) {
        authController.strategy.getMethod(req, res);
    }
    async postMethod(req, res) {
        authController.strategy.postMethod(req, res);
    }
}
exports.default = authController;
