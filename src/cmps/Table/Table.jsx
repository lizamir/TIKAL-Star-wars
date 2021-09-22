import './Table.scss';

export const Table = ({
  biggestVeichele,
  biggestVeichelePilots,
  biggestVeichelePlanets,
}) => {
  const makeTextsArrayToText = (arr) => {
    return arr.join(', ');
  };

  const pilotsText = makeTextsArrayToText(
    biggestVeichelePilots.map((currPilot) => currPilot.name)
  );

  const biggestPlanetsText = makeTextsArrayToText(
    biggestVeichelePlanets.map(
      (currPlanet) => `${currPlanet.name}: ${currPlanet.population}`
    )
  );

  return (
    <div className="table-page">
      <h1>Table</h1>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td>Vehicle name with the largest sum</td>
              <td>{biggestVeichele.name}</td>
            </tr>
            <tr>
              <td>Related home planets and their respective population</td>
              <td>{biggestPlanetsText}</td>
            </tr>
            <tr>
              <td>Related pilot names</td>
              <td>{pilotsText}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
