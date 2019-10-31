import React from 'react';
import ChangeHistory from '@material-ui/icons/ChangeHistory';
import Probe from '../../components/probe/probe.js';
import './player.css';

export default function Player({ location, probes }) {
  const target = 400;
  return (
    <div>
    <ChangeHistory color="primary" className="planet" style={{ bottom: location }} />
    { probes.map((probe, idx) =>
      <Probe key={idx} target={target} {...probe} />)
    }
    </div>
  );
}
