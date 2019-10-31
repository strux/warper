import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Badge from '@material-ui/core/Badge';
import './drone.css';

export default function Drone({ id, location, target }) {
  const direction = location > target ? 'down' : 'up'
  const deployed = target ? 'deployed' : 'docked'
  return (
    <div className={`drone ${direction} ${deployed}`} style={{ bottom: location }}>
      <Badge color="primary" badgeContent={id}>
        <ExpandLess color="primary"/>
      </Badge>
    </div>
  );
}
