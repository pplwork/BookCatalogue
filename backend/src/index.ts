import express, { Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as admin from "firebase-admin";
import * as serviceAccount from "./bookproject-dfb00-firebase-adminsdk-2c6k6-154712943f.json";

// initialize environment variables
dotenv.config();

// setting the port
const port = process.env.PORT || 8000;

// initializing firebase-admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// initialize express server
const app = express();
app.use(cors({ origin: "*" }));

interface Book {
  title: string;
  year: number;
  description: string;
  image: string;
  id?: string;
}

// route handler for the books route
app.get("/books", async (req, res) => {
  let books: Book[];
  try {
    books = (await admin.firestore().collection("books").get()).docs.map(
      (doc): Book => {
        const bk = doc.data() as Book;
        return {
          ...bk,
          id: doc.id,
        };
      }
    );
  } catch (err) {
    return res.json(err);
  }
  return res.json(books);
});

// route handler for the books/:id route
app.get("/books/:id", async (req, res) => {
  const id: string = req.params.id;
  let book: Book;
  try {
    book = (
      await admin.firestore().collection("books").doc(id).get()
    ).data() as Book;
    book.id = id;
  } catch (err) {
    return res.json(err);
  }
  return res.json(book);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
