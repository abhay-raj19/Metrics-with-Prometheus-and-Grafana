"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCountGauge = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const requestUserGauge = new prom_client_1.default.Gauge({
    name: "active_users",
    help: "Total no of active users on the platform",
    labelNames: ["method", "route", "status_code"]
});
function requestCountGauge(req, res, next) {
    requestUserGauge.inc({
        method: req.method,
        route: req.path,
    });
    res.on("finish", () => {
        requestUserGauge.dec();
    });
    next();
}
exports.requestCountGauge = requestCountGauge;
