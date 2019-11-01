import React, { useReducer } from 'react';
import initialState from './data/initialState.json';
import { Container, Grid, Box, Button, CircularProgress } from '@material-ui/core';
import Brightness1 from '@material-ui/icons/Brightness1';
import Planet from './components/planet/planet.js';
import PlanetData from './components/planet-data/planet-data.js';
import Player from './components/player/player.js';
import useInterval from './hooks/use-interval.js';
import { getRandomInt } from './utils.js';
import { maxPlanets, minPlanetSize, maxPlanetSize, minLocation, maxLocation } from './constants.js';
import './App.css';

const canWarp = (player) => player.fuel >= player.warpCost

const moveActor = actor => {
  if (!actor.target) return actor;
  const distance = actor.target - actor.location;
  const move = actor.speed * Math.sign(distance);
  const delta = Math.abs(distance) - Math.abs(move)
  const newLocation = (actor.location + (delta <= 0 ? distance : move))
  return {
    ...actor,
    location: newLocation
  }
}

const setTarget = (actor, id, target) => {
  if (actor.id === id) {
    return {
      ...actor,
      target: target
    }
  } else {
    return actor;
  }
}

const generatePlanets = (player, planetCount = getRandomInt(1, maxPlanets)) => {
  const planets = [];

  const generatePlanet = () => {
    const size = getRandomInt(minPlanetSize, maxPlanetSize);
    return {
        size: size,
        location: getRandomInt(minLocation, maxLocation - (size / 2))
    }
  };

  const planetRange = planet => {
    const radius = planet.size / 2;
    return [planet.location - radius, planet.location + radius];
  }

  const overlap = candidate => {
    const overlap = planets.map(planet => {
      const [c1, c2] = planetRange(candidate);
      const [p1, p2] = planetRange(planet);
      return ((c1 >= p1 && c1 <= p2) || (c2 >= p1 && c2 <= p2))
    }, false);
    return overlap.some(o => o === true);
  }

  let id = 1;
  while (planets.length <= planetCount) {
    let candidate = generatePlanet();
    if (!overlap(candidate)) {
      candidate.id = id;
      candidate.distance = Math.abs(player.location - candidate.location);
      planets.push(candidate);
      id++;
    }
  }

  planets[0].selected = true;
  return planets;
}

const warpDrones = (drones, player, newLocation) => {
  return drones
    .filter(d => d.location === player.location)
    .map(d => ({ ...d, location: newLocation }));
}
const reducer = (state, action) => {
  const { player, drones, planets } = state;
  let newState;

  switch(action.type) {
    case 'warp':
      if (canWarp(player)) {
        const playerLocation = getRandomInt(50, 500);
        newState = {
          ...state,
          drones: warpDrones(drones, player, playerLocation),
          player: {...player, location: playerLocation, fuel: (player.fuel - player.warpCost)},
          planets: generatePlanets(player),
        };
        return newState;
      }
      return state;
    case 'select-planet':
      newState = {
        ...state,
        planets: state.planets.map((p) => p.id === action.id ? {...p, selected: true } : {...p, selected: false })
      };
      return newState;
    case 'dispatch-drone':
      newState = {
        player,
        drones: state.drones.map((d) => setTarget(d, action.id, action.target)),
        planets
      };
      return newState;
    default:
      newState = {
        player,
        drones: state.drones.map(moveActor),
        planets
      };
      return newState;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { player, drones, planets } = state;
  const selectedPlanet = planets.find((p) => p.selected);

  useInterval(() => {
    dispatch('tick')
  }, 1000);

  return (
    <Container maxWidth="sm">
      <Grid container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={2}
      >
        <Grid item xs={3}>
          <Box className="system-visualizer">
            <Brightness1 className="star" />
            { planets.map(planet =>
              <Planet key={planet.id}
                      selectPlanet={() => dispatch({ type: 'select-planet', id: planet.id })}
                      drones={drones}
                      {...planet} />)
            }
            <Player drones={drones} {...player} />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <CircularProgress variant="static" value={player.fuel / player.fuelCapacity * 100} />
          </Box>
          <Box>
            <Button variant="outlined" color="primary" disabled={!canWarp(player)} onClick={() => dispatch({ type: 'warp' })}>Warp</Button>
          </Box>
          <Box>
            <PlanetData planet={selectedPlanet} drones={drones} dispatchDrone={(id, target) => dispatch({ type: 'dispatch-drone', id: id, target: target })}/>
          </Box>
          <Box>
            { drones.map(drone =>
              <Button key={drone.id}
                variant="outlined"
                disabled={drone.location === player.location}
                onClick={() => dispatch({ type: 'dispatch-drone', id: drone.id, target: player.location })}>
                {`Recall Drone ${drone.id}`}</Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
