import React, { useReducer } from 'react';
import initialState from './data/initialState.json';
import { Container, Grid, Box, Button, CircularProgress } from '@material-ui/core';
import Brightness1 from '@material-ui/icons/Brightness1';
import Planet from './components/planet/planet.js';
import Player from './components/player/player.js';
import useInterval from './hooks/use-interval.js';
import { getRandomInt } from './utils.js';
import { maxPlanets, minPlanetSize, maxPlanetSize, minLocation, maxLocation } from './constants.js';
import './App.css';

function App() {

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

  const generateSystem = () => {
    const system = new Array(getRandomInt(1, maxPlanets))
      .fill()
      .map((p, idx) => ({
        id: idx,
        size: getRandomInt(minPlanetSize, maxPlanetSize),
        location: getRandomInt(minLocation, maxLocation)
      }));
    return system;
  }

  const reducer = (state, action) => {
    const { player, planets } = state;
    let newState;

    switch(action.type) {
      case 'warp':
        if (canWarp(player)) {
          newState = {
            ...state,
            player: {...player, location: getRandomInt(50, 500), fuel: (player.fuel - player.warpCost)},
            planets: generateSystem()
          };
          return newState;
        }
        return state;
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

  const [state, dispatch] = useReducer(reducer, initialState);

  useInterval(() => {
    dispatch('tick')
  }, 1000);

  return (
    <Container maxWidth="sm">
      <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
      >
        <Grid item xs={3}>
          <Box className="system-visualizer">
            <Brightness1 className="star" />
            { state.planets.map(planet =>
              <Planet key={planet.id}
                      dispatchDrone={id => dispatch({ type: 'dispatch-drone', id: id, target: planet.location })}
                      drones={state.drones}
                      {...planet} />)
            }
            <Player drones={state.drones} {...state.player} />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <CircularProgress variant="static" value={state.player.fuel / state.player.fuelCapacity * 100} />
          </Box>
          <Box>
            <Button variant="outlined" color="primary" disabled={!canWarp(state.player)} onClick={() => dispatch({ type: 'warp' })}>Warp</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
