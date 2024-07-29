"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/.env' });
const app = (0, express_1.default)();
if (!process.env.PORT) {
    throw new Error("PORT environment variable is not defined");
}
const port = parseInt(process.env.PORT, 10);
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello Claim_Genius");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
