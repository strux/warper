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

  const handleItemClick = (id) => {
    dispatchDrone(id);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const probeMessage = (drone) => {
    if (drone.target === location) return `drone ${drone.id} en route`;
    else if (drone.target === null) return `Launch drone ${drone.id}`;
    else if (drone.target !== null) return `Redirect drone ${drone.id}`;
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
        {drones.map(drone => (
          <MenuItem key={drone.id} onClick={() => handleItemClick(drone.id)}>
            {probeMessage(drone)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
