"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DATABASE = _a.POSTGRES_DATABASE, POSTGRES_USE_SSL = _a.POSTGRES_USE_SSL;
var knex = knex_1.default({
    client: "pg",
    connection: {
        database: POSTGRES_DATABASE,
        host: POSTGRES_HOST,
        password: POSTGRES_PASSWORD,
        ssl: POSTGRES_USE_SSL,
        user: POSTGRES_USER,
    },
});
exports.default = knex;
