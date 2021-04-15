import React from 'react';
import { makeStyles, AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: '40px',
  },
  bl: {
    width: '120px',
    borderRadius: '0px',
  },
  rmd: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color='transparent' position='static'>
        <Toolbar>
          <img className={classes.logo} src="https://siasky.net/docs/images/logo-42407883.png" alt='logo' />

          <Link to='/' className={classes.rmd}>
            <Button className={classes.bl} color='inherit'>
              <h3>API</h3>
            </Button>
          </Link>
          {/* <Link to='/app' className={classes.rmd}>
            <Button className={classes.bl} color='inherit'>
              <h3>App</h3>
            </Button>
          </Link> */}
          {/* <Link to='/stats' className={classes.rmd}>
            <Button className={classes.bl} color='inherit'>
              <h3>Stats</h3>
            </Button>
          </Link> */}
          <Link to='/credits' className={classes.rmd}>
            <Button className={classes.bl} color='inherit'>
              <h3>Credits</h3>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
