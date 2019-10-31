import React, { useReducer } from 'react';
import initialState from './data/initialState.json';
import { Container, Grid, Box } from '@material-ui/core';
import Brightness1 from '@material-ui/icons/Brightness1';
import Planet from './components/planet/planet.js';
import Player from './components/player/player.js';
import useInterval from './hooks/use-interval.js';
import './App.css';

function App() {

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

  const setTarget = (actor, target) => {
    return {
      ...actor,
      target: target
    }
  }

  const reducer = (state, action) => {
    const { player, planets } = state;
    let newState;

    switch(action.type) {
      case 'launch-drone':
        newState = {
          player,
          drones: state.drones.map((p) => setTarget(p, action.target)),
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
            { state.planets.map((planet, idx) =>
              <Planet key={idx}
                      dispatchDrone={(index, target) => dispatch({ type: 'launch-drone', index: index, target: target })}
                      drones={state.drones} {...planet} />) }
            <Player drones={state.drones} {...state.player} />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
