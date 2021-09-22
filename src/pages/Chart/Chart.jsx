import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import { Loading } from '../../cmps/Loading';
import './Chart.scss';

const planetsUrls = [
  'https://swapi.dev/api/planets/1/',
  'https://swapi.dev/api/planets/2/',
  'https://swapi.dev/api/planets/8/',
  'https://swapi.dev/api/planets/6/',
  'https://swapi.dev/api/planets/7/',
];

export const Chart = (props) => {
  const sendRequest = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [chartPlanets, setChartsData] = useState(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const answersPrm = Promise.all(
        planetsUrls.map((currUrl) => sendRequest(currUrl))
      );
      const answers = await answersPrm;
      setChartsData(answers);
    } catch (err) {
      console.log('err:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getBarPrecents = (planetPopulation) => {
    const highestPopulation = Math.max(
      ...chartPlanets.map((currPlanet) => +currPlanet.population)
    );
    console.log('highestPopulation:', highestPopulation);
    return `${(planetPopulation / highestPopulation) * 100}%`;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="chart-page">
      <h1>Population</h1>
      {isLoading && <Loading />}
      {!isLoading && chartPlanets && (
        <div className="chart">
          {chartPlanets.map((currPlanet) => (
            <div key={currPlanet.name} className="chart-bar-wrapper">
              <p className="info">{currPlanet.population}</p>
              <div className="full-cahrt-bar">
                <div
                  className="chart-bar"
                  style={{ height: getBarPrecents(+currPlanet.population) }}
                >
                  <div className="chart-bar-background"></div>
                </div>
              </div>
              <p className="info names">{currPlanet.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
