import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Book from "../interfaces/book";
import "./BookInfo.scss";

const BookInfo = (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();
  const [book, setBook] = useState<Book | null>(null);
  useEffect(() => {
    (async () => {
      let data: Book;
      try {
        data = (await axios.get(`http://localhost:8000/books/${id}`)).data;
      } catch (err) {
        console.log(err);
        return;
      }
      setBook(data);
    })();
  }, [id]);
  return (
    <div className="bookinfoContainer">
      <div className="left"></div>
      <div className="book">
        <div className="book__image">
          <img src={book?.image} alt="book cover" />
        </div>
        <div className="book__details">
          <div className="book__title">{book?.title}</div>
          <div className="book__description">{book?.description}</div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default BookInfo;
