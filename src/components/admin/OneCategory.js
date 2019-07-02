import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Clear from '@material-ui/icons/Clear';
import AddCircle from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    border: 'solid 1px #d0c9c9',
    marginTop: '0.2em',
    marginBottom: '0.2em',
  },
});

const OneCategory = ({
  category, jsUcfirst, state, onChange, addItem, getDelete,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardContent>
          <div style={{ marginTop: '3%' }}>
            <h2>{jsUcfirst(category)}</h2>
            <>
              <Grid container justify="center">
                {state[`${category}`].map(item => (
                  <Grid item xs={12} key={item.key}>
                    <div>
                      <p style={{
                        marginBottom: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center',
                      }}
                      >
                        {' '}
                        <span style={{ backgroundColor: '#EFEFEF', padding: '3px' }}>{item.value}</span>
                        <Clear
                          style={{
                            backgroundColor: '#f98181', borderRadius: '200px', fontSize: '1.4em', marginLeft: '0.2em',
                          }}
                          onClick={() => getDelete(category, item.key)}
                          type="button"
                        />
                      </p>
                    </div>
                  </Grid>
                ))}
              </Grid>

            </>
            <form autoComplete="off">
              <Grid item xs={12}>
                <TextField
                  required
                  id="new"
                  label={`Ajouter ${category}`}
                  name={category}
                  value={state[`new${category}`]}
                  onChange={onChange}
                />
                <AddCircle style={{ marginTop: '0.5em', color: '#7FE794', fontSize: '26px' }} onClick={() => addItem(category)} />
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OneCategory;
