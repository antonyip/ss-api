import React, { useState, useEffect } from 'react';
//import ReactMarkdown from 'react-markdown';
//import { makeStyles, Paper, InputBase, IconButton, Grid, Button } from '@material-ui/core';
import { makeStyles, Paper, Grid, Button, TextField } from '@material-ui/core';
//import SearchIcon from '@material-ui/icons/Search';
//import axiosClient from 'api/axiosClient';
//import PostCard from 'components/PostCard';
import { SkynetClient, parseSkylink,  deriveChildSeed, genKeyPairFromSeed} from 'skynet-js'
import { ContentRecordDAC } from "@skynetlabs/content-record-library";

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
  tut_left: {
    height: "100%",
  },
  tut_right: {
    height: "100%",
  },
  tut_item: {
    paddingTop: 5,
    paddingBottom: 5,
    spacing: 5,
  }
}));

export default function View() {
  const classes = useStyles();
  var [Tut1_URL, setTut1_URL] = useState("https://siasky.net");
  var [Tut1_MyDomain, setTut1_MyDomain] = useState("MyAppDomain");
  var [Tut1_ReturnValue, setTut1_ReturnValue] = useState('');
  var [Tut2_State, setTut2_State] = useState('XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg');
  var [Tut2a_State, setTut2a_State] = useState('AACaACU9sCXunPdbvC6x6ZGoj595vmpZP0b-VeyuW_zTSA');
  var [Tut3_Text, setTut3_Text] = useState('<html><body><h1>Hello World!</h1></body></html>');

//  var [Tut_40_MyUserID, setTut_40_MyUserID]= useState("b4f9e43178222cf33bd4432dc1eca49499397ecd1f7de23b568f3fa1e72e5c7c")
  var [Tut_40_AppDomain, setTut_40_AppDomain]= useState("MyAppDomain")
  var [Tut_40_AppMasterSeed, setTut_40_AppMasterSeed]= useState("this is your application master seed that only you should know and never expose to the internets")


  const Tut_InitSkyNetClient = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    try {

    const mySkyClient = new SkynetClient(Tut1_URL);
    // Load MySky
    const mySky = await mySkyClient.loadMySky(Tut1_MyDomain)

    // Load the pop up menu for people to login
    await mySky.requestLoginAccess()

    // get the user id - for testing purposes
    const userID = await mySky.userID()

    setTut1_ReturnValue(userID)
    console.log(userID)
    }
    catch (error)
    {
      console.log(error.message);
    }
  };

  const Tut_OpenFile = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    const mySkyClient = new SkynetClient("https://siasky.net");

    // Open a new tab in your browser
    console.log(parseSkylink(Tut2_State));
    const returnString = await mySkyClient.openFile(parseSkylink(Tut2_State));
    console.log(returnString)
  };

  const Tut_ReadFile = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    const mySkyClient = new SkynetClient("https://siasky.net");

    // Open a new tab in your browser
    console.log(parseSkylink(Tut2a_State));
    const returnString = await mySkyClient.getFileContent(parseSkylink(Tut2a_State));
    console.log(returnString)
  };

  const Tut_UploadFile = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    try{
      const mySkyClient = new SkynetClient("https://siasky.net");

      var title = 'title'
      var body = 'body'
      var blob = new Blob(
        [
          title + "\n" + body
        ],
        { type: 'text/html' }
      );
      // Open a new tab in your browser
      const returnString = await mySkyClient.uploadFile(blob)
      console.log(returnString)
    }
    catch (error)
    {
      console.log(error.message);
    }
  };


  const Tut_CreateUserSeedForYourApp = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    try {

    const mySkyClient = new SkynetClient("https://siasky.net");

    // Load MySky
    const mySky = await mySkyClient.loadMySky(Tut_40_AppDomain)

    // Load the pop up menu for people to login
    const isLoggedIn = await mySky.checkLogin()
    if (!isLoggedIn)
    {
      await mySky.requestLoginAccess()
    }

    // get the user id - to generate a child seed from your master seed
    const userID = await mySky.userID()

    const { publicKey, privateKey } = genKeyPairFromSeed(Tut_40_AppMasterSeed);

    const childSeed = deriveChildSeed(privateKey, userID);

    console.log(childSeed)
    }
    catch (error)
    {
      console.log(error.message);
    }
  };

  const Tut_50_WritingData = async() => {   
    // Old Stuffs from Tut_40..
    try {
      const mySkyClient = new SkynetClient("https://siasky.net");
      const dataKey = "MyAppDomain";
      // Load MySky
      const mySky = await mySkyClient.loadMySky(dataKey)
  
      // Load the pop up menu for people to login
      const isLoggedIn = await mySky.checkLogin()
      if (!isLoggedIn)
      {
        await mySky.requestLoginAccess()
      }
  
      // get the user id - to generate a child seed from your master seed
      const userID = await mySky.userID()
  
      const masterKey = genKeyPairFromSeed("this is your application master seed that only you should know and never expose to the internets");
  
      const childSeed = deriveChildSeed(masterKey.privateKey, userID);

      const childKeys = genKeyPairFromSeed(childSeed);
  
      // new Stuffs after previous tutorial
      // Writing Data to client db
      const json = { example: "This is some example JSON data new. From antAPI" };
      try {
        const returnValue = await mySkyClient.db.setJSON(childKeys.privateKey, dataKey, json);
        console.log(returnValue)
      } catch (error) {
        console.log(error);
      }
      }
      catch (error)
      {
        console.log(error.message);
      }
  }
  
  const Tut_50_ReadingData = async() => {   
    // Old Stuffs from Tut_40..
    try {
      const mySkyClient = new SkynetClient("https://siasky.net");
      const dataKey = "MyAppDomain";
      // Load MySky
      const mySky = await mySkyClient.loadMySky(dataKey)
  
      // Load the pop up menu for people to login
      const isLoggedIn = await mySky.checkLogin()
      if (!isLoggedIn)
      {
        await mySky.requestLoginAccess()
      }
  
      // get the user id - to generate a child seed from your master seed
      const userID = await mySky.userID()
  
      const masterKey = genKeyPairFromSeed("this is your application master seed that only you should know and never expose to the internets");
  
      const childSeed = deriveChildSeed(masterKey.privateKey, userID);

      const childKeys = genKeyPairFromSeed(childSeed);
  
      // new Stuffs after previous tutorial
      // Reading Data to from client db
      try {
        const { data, skylink } = await mySkyClient.db.getJSON(childKeys.publicKey, dataKey);
        console.log(data)
        console.log(skylink)
      } catch (error) {
        console.log(error);
      }
      }
      catch (error)
      {
        console.log(error.message);
      }
  }

  const Tut_60_SkyKeys = async() => {   
      try {
        const client = new SkynetClient("https://siasky.net");
        const mySky = await client.loadMySky("MyAppDomain");

        // Initialize DAC, auto-adding permissions.
        const dac = new ContentRecordDAC()
        await mySky.loadDacs(dac);
      }
      catch (error)
      {
        console.log(error.message)
      }
  }


  return (
    <div className={classes.root}>

      <Grid
         container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={3}
          >
        <Grid container className={classes.tut_item}>
          <Grid item xs={12}>
            <Paper className={classes.paper} alignitems="center"><p>SkynetClient API Usage (Browser-JS)</p></Paper>
          </Grid>
        </Grid>



        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Creating a Skynet Connection<br />
              const mySkyClient = new SkynetClient("https://siasky.net")<br />
              const mySky = await mySkyClient.loadMySky("MyAppDomain")<br />
              await mySky.requestLoginAccess()<br />
              const userID = await mySky.userID()<br />
              console.log(userID)<br />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField required label="SkynetPortal" value={Tut1_URL} onChange={(event) => setTut1_URL(event.target.value)} variant="standard">https://siasky.net</TextField> <br></br><br></br>
              <TextField required label="YourAppDomain" onChange={(event) => setTut1_MyDomain(event.target.value)} value={Tut1_MyDomain} variant="standard">MyAppDomain</TextField><br></br><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_InitSkyNetClient()}>TriggerAPI</Button><br></br><br></br>
              <TextField id="tut_rv1" label="ReturnValue" readOnly value={Tut1_ReturnValue} variant="standard"></TextField><br></br><br></br>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Opening a new Browser Tab a file from Skynet
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              Opening a file on SkyNet<br></br>
              <TextField label="XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg" onChange={(event) => setTut2_State(event.target.value)} value={Tut2_State} variant="standard" helperText="sialink"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_OpenFile()}>Open a file on Skynet</Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Reading a file from Skynet
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              Reading a file on SkyNet<br></br>
              <TextField label="XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg" onChange={(event) => setTut2a_State(event.target.value)} value={Tut2a_State} variant="standard" helperText="sialink"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_ReadFile()}>Read a file on Skynet</Button>
            </Paper>
          </Grid>
        </Grid>
              
        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Uploading a file to Skynet<br></br>
              Takes about 1 minute to upload.. <br></br>
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              Uploading a file on SkyNet<br></br>
              <TextField label="My User Text" onChange={(event) => setTut3_Text(event.target.value)} value={Tut3_Text} variant="standard"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_UploadFile()}>UploadText</Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item xs={12}>
            <Paper className={classes.paper} alignitems="center"><p>SkynetClient-MySky User Handling(Browser-JS)</p></Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Creating User Seeds<br></br>
              You can login using the above login script to get your userid.
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              {/* <TextField label="User's UserID" onChange={(event) => setTut_40_MyUserId(event.target.value)} value={Tut_40_MyUserId} variant="standard"></TextField><br></br> */}
              <TextField label="App Domain" onChange={(event) => setTut_40_AppDomain(event.target.value)} value={Tut_40_AppDomain} variant="standard"></TextField><br></br>
              <TextField label="App MasterSeed" onChange={(event) => setTut_40_AppMasterSeed(event.target.value)} value={Tut_40_AppMasterSeed} variant="standard"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_CreateUserSeedForYourApp()}>Create</Button>
            </Paper>
          </Grid>
        </Grid>

{/* SkynetClient-SkyDB UserData Handling(Browser-JS) */}
        <Grid container className={classes.tut_item}>
          <Grid item xs={12}>
            <Paper className={classes.paper} alignitems="center"><p>SkynetClient-SkyDB UserData Handling(Browser-JS)</p></Paper>
          </Grid>
        </Grid>


        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Writing Application Data based on Generated Child Seed<br></br>
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              {/* <TextField label="App Domain" onChange={(event) => setTut_40_AppDomain(event.target.value)} value={Tut_40_AppDomain} variant="standard"></TextField><br></br> */}
              {/* <TextField label="App MasterSeed" onChange={(event) => setTut_40_AppMasterSeed(event.target.value)} value={Tut_40_AppMasterSeed} variant="standard"></TextField><br></br> */}
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_50_WritingData()}>Create</Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              Reading Application Data based on Generated Child Seed<br></br>
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              {/* <TextField label="App Domain" onChange={(event) => setTut_40_AppDomain(event.target.value)} value={Tut_40_AppDomain} variant="standard"></TextField><br></br> */}
              {/* <TextField label="App MasterSeed" onChange={(event) => setTut_40_AppMasterSeed(event.target.value)} value={Tut_40_AppMasterSeed} variant="standard"></TextField><br></br> */}
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_50_ReadingData()}>Create</Button>
            </Paper>
          </Grid>
        </Grid>





      </Grid>
    </div>
  );
}
