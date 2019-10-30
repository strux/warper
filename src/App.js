import React from 'react';
import { Container, Grid, Box, Button } from '@material-ui/core';
import Brightness1 from '@material-ui/icons/Brightness1';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm">
      <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
      >
        <Grid item xs={2}>
          <Box className="system-visualizer">
            <Brightness1 className="star" />
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box>
            <Button variant="outlined">Launch Probe</Button>
            <Button variant="outlined" color="primary">Launch Probe</Button>
            <Button variant="outlined" color="secondary">Launch Probe</Button>
            <p>Here is some text</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
