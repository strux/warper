import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import './drone.css';

export default function Drone({ location, target }) {
  const direction = location > target ? 'down' : 'up'
  const deployed = target ? 'deployed' : 'docked'
  return (
    <ExpandLess color="primary" className={`drone ${direction} ${deployed}`} style={{ bottom: location }} />
  );
}
