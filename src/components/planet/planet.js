import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Brightness1 from '@material-ui/icons/Brightness1';
import './planet.css';

export default function Planet({ id, selected, location, size, drones, selectPlanet }) {

  const handleClick = () => {
    selectPlanet();
  }

  return (
    <div>
      <IconButton id={id}
                  className={`planet${selected ? ' selected' : ''}`}
                  style={{ bottom: location, width: size, height: size }}
                  onClick={handleClick}>
        <Brightness1 />
      </IconButton>
    </div>
  );
}
