import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Brightness1 from '@material-ui/icons/Brightness1';
import './planet.css';

export default function Planet({ location, size, probes, dispatchProbe }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (idx) => {
    console.log(idx);
    dispatchProbe(idx, location);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const probeMessage = (probe, idx) => {
    if (probe.target === location) return `Probe ${idx} en route`;
    else if (probe.target === null) return `Launch Probe ${idx}`;
    else if (probe.target !== null) return `Redirect Probe ${idx}`;
  }

  return (
    <div>
      <IconButton className="planet"
                  style={{ bottom: location, width: size, height: size }}
                  onClick={handleClick}>
        <Brightness1 />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {probes.map((probe, idx) => (
          <MenuItem key={idx} onClick={(idx) => handleItemClick(idx)}>
            {probeMessage(probe, idx)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
