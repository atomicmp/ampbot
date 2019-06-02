"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var ENV = process.env.ENV;
var ignorePrivate = winston_1.format(function (info) {
    if (info.private) {
        return false;
    }
    return info;
});
var logger = winston_1.createLogger({
    format: winston_1.format.combine(ignorePrivate(), winston_1.format.json()),
    level: "info",
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        })
    ].concat((ENV === "development"
        ? []
        : [
            new winston_1.transports.File({
                filename: "logs/errors.log",
                level: "error",
            }),
            new winston_1.transports.File({ filename: "logs/output.log" }),
        ])),
});
exports.default = logger;
