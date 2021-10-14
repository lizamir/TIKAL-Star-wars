import './Details.scss';
import { BsFillStarFill } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';

export const Details = ({
  idx,
  handleFavorite,
  favorites,
  removeFavorite,
  movies,
}) => {
  return (
    <div className="details-container">
      {idx < 0 && (
        <h1 className="title-details"> Tap a title for get Details</h1>
      )}
      {idx >= 0 && (
        <>
          <h1>{movies[idx].title}</h1>
          <p className="details">{movies[idx].opening_crawl}</p>
          {!favorites.includes(idx) && (
            <BsFillStarFill
              className="fav"
              title="Add to favorite?"
              onClick={() => handleFavorite(idx)}
            />
          )}

          {favorites.includes(idx) && (
            <>
              <AiOutlineStar
                className="fav"
                title="Remove from favorite?"
                onClick={() => removeFavorite(idx)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
