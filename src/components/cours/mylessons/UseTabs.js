import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function UseTabs() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper square>
      <Tabs centered value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab label="Mes parcours" />

        <Tab label="Cours suivis" />
      </Tabs>
    </Paper>
  );
}
