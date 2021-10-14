import './Titles.scss';
import { BsFillStarFill } from 'react-icons/bs';

export const Titles = ({ movies, favorites, handleDetails }) => {
  return (
    <div className="title-container">
      {movies.map((movie, idx) => (
        <div
          onClick={() => handleDetails(idx)}
          key={movie.title}
          className="title_item"
        >
          <h2>{movie.title}</h2>
          {favorites.map(
            (favorite) =>
              favorite === idx && (
                <BsFillStarFill key={favorite} className="favorite" />
              )
          )}
        </div>
      ))}
    </div>
  );
};
