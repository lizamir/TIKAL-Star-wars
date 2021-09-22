import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Table } from '../../cmps/Table';
import useApi from '../../hooks/useApi';
import { Loading } from '../../cmps/Loading/Loading';

const MAX_VEHICLES_PAGES = 4;

export const Home = () => {
  const sendRequest = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [biggestVeichele, setBiggestVeichele] = useState(null);
  const [biggestVeichelePlanets, setBiggestVeichelePlanets] = useState(null);
  const [biggestVeichelePilots, setBiggestVeichelePilots] = useState(null);

  const loadDataForTable = async () => {
    setIsLoading(true);

    try {
      const vehiclesPagesPrms = [];
      for (let i = 1; i <= MAX_VEHICLES_PAGES; i++) {
        vehiclesPagesPrms.push(
          sendRequest(`https://swapi.dev/api/vehicles?page=${i}`)
        );
      }
      const vehiclesPages = await Promise.all(vehiclesPagesPrms);
      const vehicles = vehiclesPages.reduce(
        (acc, curr) => [...acc, ...curr.results],
        []
      );

      // 1. find all pilots of every vehicle
      const vehiclePilotsPrmsPrms = vehicles.map((curr) => {
        return Promise.all(
          curr.pilots.map((currPilotUrl) => sendRequest(currPilotUrl))
        );
      });

      const vehiclesPilots = await Promise.all(vehiclePilotsPrmsPrms);
      console.log('vehiclesPilots:', vehiclesPilots);
      const filteredVehiclesPilotsPlanetsUrls = vehiclesPilots.map(
        (currVeiclePilots) => {
          const currVehicleHomeworlds = currVeiclePilots.map(
            (currPilot) => currPilot.homeworld
          );
          const uniqueCurrVehicleHomeworlds = [
            ...new Set(currVehicleHomeworlds),
          ];
          return uniqueCurrVehicleHomeworlds;
        }
      );

      const vehiclePilotsPlanetsPrmsPrms =
        filteredVehiclesPilotsPlanetsUrls.map((currVehiclePilotsUrls) => {
          return Promise.all(
            currVehiclePilotsUrls.map((currUrl) => sendRequest(currUrl))
          );
        });
      const vehiclesPilotsPlanets = await Promise.all(
        vehiclePilotsPlanetsPrmsPrms
      );

      const vehiclesSum = vehiclesPilotsPlanets.map((currVehicle) => {
        return currVehicle.reduce((acc, currPlanet) => {
          return (
            acc +
            (currPlanet.population === 'unknown' ? 0 : +currPlanet.population)
          );
        }, 0);
      });

      const biggestPopulation = Math.max(...vehiclesSum);
      const biggestVehicleIndex = vehiclesSum.findIndex(
        (curr) => curr === biggestPopulation
      );

      setBiggestVeichele(vehicles[biggestVehicleIndex]);
      setBiggestVeichelePilots(vehiclesPilots[biggestVehicleIndex]);
      setBiggestVeichelePlanets(vehiclesPilotsPlanets[biggestVehicleIndex]);
    } catch (err) {
      console.log('err:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDataForTable();
  }, []);

  return (
    <div className="hero-container">
      {isLoading && <Loading />}
      {!isLoading &&
        biggestVeichele &&
        biggestVeichelePilots &&
        biggestVeichelePlanets && (
          <Table
            biggestVeichele={biggestVeichele}
            biggestVeichelePilots={biggestVeichelePilots}
            biggestVeichelePlanets={biggestVeichelePlanets}
          />
        )}
    </div>
  );
};
