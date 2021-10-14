import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Titles } from '../../cmps/Titles';
import { Details } from '../../cmps/Details';
import useApi from '../../hooks/useApi';
import { Loading } from '../../cmps/Loading/Loading';
import { useCookies } from 'react-cookie';

export const Home = () => {
  const sendRequest = useApi();
  const [idx, setIdx] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cookies, setCookie] = useCookies(['favorites']);

  const loadData = async () => {
    sendRequest('https://swapi.dev/api/films').then((response) => {
      setIsLoading(false);
      setMovies(response.results);
      if (cookies.favorites) {
        setFavorites(cookies.favorites);
      } else {
        setCookie('favorites', []);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCookie('favorites', favorites);
  }, [favorites]);

  const handleDetails = (i) => {
    setIdx(i);
  };

  const handleFavorite = (i) => {
    setFavorites([...favorites, i]);
  };

  const removeFavorite = (i) => {
    if (favorites.includes(i)) {
      setFavorites(
        favorites.filter((idx) => {
          return idx !== i;
        })
      );
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="container">
          <Titles
            favorites={favorites}
            movies={movies}
            handleDetails={handleDetails}
          />
          <Details
            favorites={favorites}
            handleFavorite={handleFavorite}
            removeFavorite={removeFavorite}
            movies={movies}
            idx={idx}
          />
        </div>
      )}
    </div>
  );
};
