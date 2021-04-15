import React, { useState, useEffect } from 'react';
//import ReactMarkdown from 'react-markdown';
//import { makeStyles, Paper, InputBase, IconButton, Grid, Button } from '@material-ui/core';
import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
//import SearchIcon from '@material-ui/icons/Search';
//import axiosClient from 'api/axiosClient';
//import PostCard from 'components/PostCard';
import { SkynetClient, parseSkylink,  deriveChildSeed, genKeyPairAndSeed, genKeyPairFromSeed} from 'skynet-js'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '15vh',
    flexGrow: 1,
  },
  pt: {
    padding: '5px 15px',
  },

  bt: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '99%',
  },
  mgb: {
    marginBottom: '30px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paper: {
    height: "100%",
    margin: 1,
    paddingTop: 5,
    paddingLeft: 15,
    elevation: 30,
    spacing: 5
  },
}));

export default function View() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>Github Link - https://github.com/antonyip/ss-api</div>
      <div>Status of Skynet SDKs - https://hackmd.io/BFPWYyDfT6yalz0o_gipyw?view</div>
      <div>Documentations - https://siasky.net/docs/</div>
      <div>siasky-hosting - https://github.com/vinhyenvodoi98/siasky-hosting</div>
      <div>siasky-starter-pack - https://github.com/vinhyenvodoi98/EZ-Web-Own-the-internet-Hackathon</div>
      <div>tracker for DAC - https://skey.hns.siasky.net</div>
      <div>skynet-workshop - https://github.com/SkynetLabs/skynet-workshop</div>
    </div>
  );
}
