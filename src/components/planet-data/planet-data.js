import React from 'react';
import { Badge, Button, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import './planet-data.css';

const droneStatus = (drone, location) => {
  if (drone.target === location) return 'enroute';
  else if (drone.target === null) return 'deploy';
  else if (drone.target !== null) return 'reroute';
}

// TODO: This is ghettto
const buttonColor = (drone, location) => {
  const status = droneStatus(drone, location);
  if (status === 'enroute') return 'primary';
  if (status === 'reroute') return 'secondary';
}

export default function PlanetData({ planet, drones, dispatchDrone }) {
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Planet</TableCell>
            <TableCell>{planet.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Distance</TableCell>
            <TableCell>{planet.distance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="drone-controls">
        { drones.map(drone =>
          <Badge  key={drone.id} color="primary" badgeContent={drone.id}>
            <Button
              color={buttonColor(drone, planet.location)}
              variant="outlined"
              onClick={() => dispatchDrone(drone.id, planet.location)}>
              {droneStatus(drone, planet.location)}
            </Button>
          </Badge>
        )}
      </div>
    </div>
  );
}
