import { useState, useEffect } from "react";
import axios from "axios";
import Book from "../interfaces/book";
import { useHistory } from "react-router-dom";
import "./Home.scss";

type CardProps = {
  title: string;
  image: string;
  id: string;
  year: number;
  description: string;
};
const Card = ({
  title,
  image,
  id,
  year,
  description,
}: CardProps): JSX.Element => {
  const history = useHistory();
  return (
    <div className="card" onClick={() => history.push(`/book/${id}`)}>
      <div className="card__image">
        <img src={image} alt="book cover" />
      </div>
      <div className="card__details">
        <div className="card__details-title">{title}</div>
        <div className="card__details-year">{year}</div>
      </div>
    </div>
  );
};

const Home = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    (async () => {
      let data: Book[];
      try {
        data = (
          await axios.get("https://bookcatalogue-pplwork.herokuapp.com/books")
        ).data;
      } catch (err) {
        console.log(err);
        return;
      }
      setBooks(data);
    })();
  }, []);
  return (
    <div className="container">
      <div className="title">Book Catalogue</div>
      <div className="booklist">
        {books.map((book: Book): JSX.Element => {
          return <Card key={book.id} {...book} />;
        })}
      </div>
    </div>
  );
};

export default Home;
