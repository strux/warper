import React from 'react';
import ChangeHistory from '@material-ui/icons/ChangeHistory';
import Drone from '../../components/drone/drone.js';
import './player.css';

export default function Player({ location, drones }) {
  const target = 400;
  return (
    <div>
    <ChangeHistory color="primary" className="planet" style={{ bottom: location }} />
    { drones.map((drone, idx) =>
      <Drone key={idx} target={target} {...drone} />)
    }
    </div>
  );
}
