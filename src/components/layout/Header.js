import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CreateDialog from '../Exercises/Dialog/Create';

class Header extends Component {
  render() {
    const { muscles, onExerciseCreate } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="headline" color="inherit" style={{ flex: 1 }}>
              Exercise Database
            </Typography>

            <CreateDialog onCreate={onExerciseCreate} muscles={muscles} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
