import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="details-card not-found-card">
        <h1>404</h1>
        <h2>Сторінку не знайдено</h2>
        <p>Такої сторінки не існує або посилання неправильне.</p>

        <Link to="/">
          <button>Повернутися на головну</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;