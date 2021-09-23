"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const admin = __importStar(require("firebase-admin"));
const serviceAccount = __importStar(require("./bookproject-dfb00-firebase-adminsdk-2c6k6-154712943f.json"));
// initialize environment variables
dotenv_1.default.config();
// setting the port
const port = process.env.PORT || 8000;
// initializing firebase-admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// initialize express server
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
// route handler for the books route
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let books;
    try {
        books = (yield admin.firestore().collection("books").get()).docs.map((doc) => {
            const bk = doc.data();
            return Object.assign(Object.assign({}, bk), { id: doc.id });
        });
    }
    catch (err) {
        return res.json(err);
    }
    return res.json(books);
}));
// route handler for the books/:id route
app.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let book;
    try {
        book = (yield admin.firestore().collection("books").doc(id).get()).data();
        book.id = id;
    }
    catch (err) {
        return res.json(err);
    }
    return res.json(book);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
//# sourceMappingURL=index.js.map