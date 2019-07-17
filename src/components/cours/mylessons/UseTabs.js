import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../../SCSS/MyLessons.scss';

export default function UseTabs(props) {
  const { changeTabs, currentValue } = props;

  return (
    <Paper
      square
    >
      <Tabs style={{ backgroundColor: '#138787', borderStyle: 'none', height: 50 }} centered value={currentValue} onChange={changeTabs}>
        <Tab className="navbar" label="Mes parcours" />
        <Tab className="navbar" label="Cours suivis" />
      </Tabs>
    </Paper>
  );
}
