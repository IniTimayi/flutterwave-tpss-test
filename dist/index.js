"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web_routes_1 = __importDefault(require("./routes/web.routes"));
const bodyParser = require('body-parser');
const index = (0, express_1.default)();
index.use(bodyParser.json());
index.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-allow-Headers', '*');
    next();
});
index.use('/welcome', (req, res) => res.send('Welcome to LannisterPay Gateway'));
index.use('/', web_routes_1.default);
const port = process.env.PORT || '8000';
index.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map