import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function UseTabs(props) {
  const { changeTabs, currentValue } = props;
  return (
    <Paper square>
      <Tabs centered value={currentValue} indicatorColor="primary" textColor="primary" onChange={changeTabs}>
        <Tab label="Mes parcours" />

        <Tab label="Cours suivis" />
      </Tabs>
    </Paper>
  );
}
