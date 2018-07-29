import React, { Component } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

class Footer extends Component {
  render() {
    const { muscles } = this.props;
    return (
      <Paper>
        <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
          <Tab label="ALL" />
          {muscles.map(group => <Tab label={group} />)}
        </Tabs>
      </Paper>
    );
  }
}

export default Footer;
