import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import './probe.css';

export default function Probe({ location, target }) {
  const direction = location > target ? 'down' : 'up'
  const deployed = target ? 'deployed' : 'docked'
  return (
    <ExpandLess color="primary" className={`probe ${direction} ${deployed}`} style={{ bottom: location }} />
  );
}
