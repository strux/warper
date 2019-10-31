import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Brightness1 from '@material-ui/icons/Brightness1';
import './planet.css';

export default function Planet({ location, size, drones, dispatchDrone }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (idx) => {
    console.log(idx);
    dispatchDrone(idx, location);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const probeMessage = (drone, idx) => {
    if (drone.target === location) return `drone ${idx} en route`;
    else if (drone.target === null) return `Launch drone ${idx}`;
    else if (drone.target !== null) return `Redirect drone ${idx}`;
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
        {drones.map((drone, idx) => (
          <MenuItem key={idx} onClick={(idx) => handleItemClick(idx)}>
            {probeMessage(drone, idx)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
