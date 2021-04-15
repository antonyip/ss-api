import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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

  paper: {
    height: "100%",
    margin: 1,
    paddingTop: 5,
    paddingLeft: 15,
    elevation: 30,
    spacing: 5
  },
  tut_input: {
    width: "100%"
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

const example_md = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

const title_md =`
# SkynetClient API Usage (Browser-JS)
`
const tut1_md =`
  ## Creating a Skynet Connection
  ~~~js
  try {
    const mySkyClient = new SkynetClient(Tut1_URL);
    // Load MySky
    const mySky = await mySkyClient.loadMySky(Tut1_MyDomain)

    // Load the pop up menu for people to login
    const isLoggedIn = await mySky.checkLogin()
    if (!isLoggedIn)
    {
      await mySky.requestLoginAccess()
    }

    // get the user id - for testing purposes
    const userID = await mySky.userID()

    setTut1_ReturnValue(userID)
    console.log(userID)
    }
    catch (error)
    {
      console.log(error.message);
    }
  ~~~
`

const tut1a_md =`
  ## Logout
  ~~~js
  const mySkyClient = new SkynetClient();
  const mySky = await mySkyClient.loadMySky()
  mySky.logout()
  ~~~
`

const tut2_md =`
  ## Opening a new Browser Tab a file from Skynet
  ~~~js
  const mySkyClient = new SkynetClient("https://siasky.net");

  // Open a new tab in your browser
  const returnString = await mySkyClient.openFile(parseSkylink(Tut2_State));
  ~~~
`
const tut3_md =`
  ## Reading a file from Skynet
  ~~~js
  // Entry point of all SkynetClients 
  // - you should leave this empty on a production system
  // e.g. const mySkyClient = new SkynetClient();
  const mySkyClient = new SkynetClient("https://siasky.net");

  // Open a new tab in your browser
  console.log(parseSkylink(Tut2a_State))
  const returnString = await mySkyClient.getFileContent(parseSkylink(Tut2a_State));
  console.log(returnString)
  setTut2a_ReturnValue(returnString.data)
  ~~~
`

const tut4_md =`
  ## Uploading a file to Skynet
  Takes about 1 minute to upload...
  ~~~js
  // Entry point of all SkynetClients 
  try{
    const mySkyClient = new SkynetClient("https://siasky.net");
    var blob = new Blob(
      [
        Tut3_Text
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
  ~~~
`
const tut_50_md =`
## Writing Application Data based on Generated Child Seed
~~~js
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

  const masterKey = genKeyPairFromSeed("<MasterKey>");

  const childSeed = deriveChildSeed(masterKey.privateKey, userID)

  const childKeys = genKeyPairFromSeed(childSeed)

  // Writing Data to client db
  // "This is some example JSON data new. From antAPI"
  const json = { example: Tut_50_Data , moreStuffs: "you can add more stuffs..." }
  try {
    const returnValue = await mySkyClient.db.setJSON(childKeys.privateKey, dataKey, json)
    console.log(returnValue)
    setTut_50_ReturnValue(returnValue.skylink)
  } catch (error) {
    console.log(error);
  }
}
catch (error)
{
  console.log(error.message);
}
~~~
`
const tut_51_md =`
## Reading Application Data based on Generated Child Seed
~~~js
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

  const masterKey = genKeyPairFromSeed("<MasterKey>");

  const childSeed = deriveChildSeed(masterKey.privateKey, userID);

  const childKeys = genKeyPairFromSeed(childSeed);

  // new Stuffs after previous tutorial
  // Reading Data to from client db
  try {
    const { data, skylink } = await mySkyClient.db.getJSON(childKeys.publicKey, dataKey);
    console.log(data)
    console.log(skylink)
    setTut_50_ReturnValue2(data.example)
  } catch (error) {
    console.log(error);
  }
  }
  catch (error)
  {
    console.log(error.message);
  }
~~~
`

const myuser_md =`# User Handling`

const myuserdata_md =`# UserData Handling`

const mydac_md =`# Content Record Data Access Control (DAC) Handling
You have to go to https://skey.hns.siasky.net/ to retrieve the records as the Browser-JS doesn't allow you to.
`
const myuserseeds_md =`
## Creating User Seeds
~~~js
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
    setTut_40_ReturnValue(childSeed)
  }
  catch (error)
  {
    console.log(error.message);
  }
~~~
`
const tut_55_md =`
## Getting Discoverable Json
~~~js
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

  // Get discoverable JSON data from the given path.
  const { data, skylink } = await mySky.getJSON(Tut_55_Path);
  console.log(data)
  console.log(skylink)
  setTut_55_RV1(data.message)
  setTut_55_RV2(skylink)
} catch (error) {
  console.log(error)
}
~~~
`

const tut_56_md =`
## Setting Discoverable Json
~~~js
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

  // Set discoverable JSON data from the given path.
  let jsonValue = { message: Tut_56_Message }
  const { data, skylink } = await mySky.setJSON(Tut_56_Path, jsonValue);
  console.log(data)
  console.log(skylink)
  setTut_56_RV1(data.message)
  setTut_56_RV2(skylink)
} catch (error) {
  console.log(error)
}
~~~
`
const mydaccreate_md =
`
## Create DAC
~~~js
try {
  const client = new SkynetClient("https://siasky.net");
  const mySky = await client.loadMySky("MyAppDomain");

  // Initialize DAC, auto-adding permissions.
  const dac = new ContentRecordDAC()
  await mySky.loadDacs(dac);
  let jsonValue = {skylink: Tut_60_SkyLink, metadata: {action:"NotInUse?"}}
  const res = await dac.recordNewContent(jsonValue)
  console.log(res)
  setTut_60_ReturnValue(res.submitted)
}
catch (error)
{
  console.log(error.message)
}
~~~
`
const mydacinteract_md =
`
## Interact DAC
~~~js
try {
  const client = new SkynetClient("https://siasky.net");
  const mySky = await client.loadMySky("MyAppDomain");

  // Initialize DAC, auto-adding permissions.
  const dac = new ContentRecordDAC()
  await mySky.loadDacs(dac);
  let jsonValue = {skylink: Tut_61_SkyLink, metadata: {action:Tut_61_Action}}
  const res = await dac.recordInteraction(jsonValue)
  console.log(res)
  setTut_61_ReturnValue(res.submitted)
}
catch (error)
{
  console.log(error.message)
}
~~~
`

export default function View() {
  const classes = useStyles();
  var [Tut1_URL, setTut1_URL] = useState("https://siasky.net");
  var [Tut1_MyDomain, setTut1_MyDomain] = useState("MyAppDomain");
  var [Tut1_ReturnValue, setTut1_ReturnValue] = useState('');
  var [Tut2_State, setTut2_State] = useState('XABvi7JtJbQSMAcDwnUnmp2FKDPjg8_tTTFP4BwMSxVdEg');
  var [Tut2a_State, setTut2a_State] = useState('AADAzrRtsa4KB5tN4QUOJnRxD3-DWRSSbDonpWq9xHq5WQ');
  var [Tut2a_ReturnValue, setTut2a_ReturnValue] = useState('');
  var [Tut3_Text, setTut3_Text] = useState('<html><body><h1>Hello World!</h1></body></html>');
  var [Tut4_ReturnValue, setTut4_ReturnValue] = useState('');
//  var [Tut_40_MyUserID, setTut_40_MyUserID]= useState("b4f9e43178222cf33bd4432dc1eca49499397ecd1f7de23b568f3fa1e72e5c7c")
  var [Tut_40_AppDomain, setTut_40_AppDomain]= useState("MyAppDomain")
  var [Tut_40_AppMasterSeed, setTut_40_AppMasterSeed]= useState("this is your application master seed that only you should know and never expose to the internets")
  var [Tut_40_ReturnValue, setTut_40_ReturnValue]= useState("")
  var [Tut_50_Data, setTut_50_Data]= useState("This is some example JSON data new. From antAPI")
  var [Tut_50_ReturnValue, setTut_50_ReturnValue]= useState("")
  var [Tut_50_ReturnValue2, setTut_50_ReturnValue2]= useState("")
  var [Tut_55_Path, setTut_55_Path]= useState("MyAppDomain/MyPath")
  var [Tut_56_Message, setTut_56_Message]= useState("Hello World!")
  var [Tut_56_Path, setTut_56_Path]= useState("MyAppDomain/MyPath")
  var [Tut_55_RV1, setTut_55_RV1]= useState("")
  var [Tut_55_RV2, setTut_55_RV2]= useState("")
  var [Tut_56_RV1, setTut_56_RV1]= useState("")
  var [Tut_56_RV2, setTut_56_RV2]= useState("")
  
  var [Tut_60_SkyLink, setTut_60_SkyLink]= useState("AAA6f5jNF0O8xxtObjf7HwWz_k-ozW8xxuEq2gjtdManQQ")
  var [Tut_60_ReturnValue, setTut_60_ReturnValue]= useState("")
  var [Tut_61_SkyLink, setTut_61_SkyLink]= useState("AAA6f5jNF0O8xxtObjf7HwWz_k-ozW8xxuEq2gjtdManQQ")
  var [Tut_61_Action, setTut_61_Action]= useState("DefaultAction")
  var [Tut_61_ReturnValue, setTut_61_ReturnValue]= useState("")
  
  

  const Tut_InitSkyNetClient = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    try {

    const mySkyClient = new SkynetClient(Tut1_URL);
    // Load MySky
    const mySky = await mySkyClient.loadMySky(Tut1_MyDomain)

    // Load the pop up menu for people to login
    const isLoggedIn = await mySky.checkLogin()
    if (!isLoggedIn)
    {
      await mySky.requestLoginAccess()
    }

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

  const Tut_Logout = async () => {
    const mySkyClient = new SkynetClient();
    const mySky = await mySkyClient.loadMySky()
    mySky.logout()
  }

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
    console.log(parseSkylink(Tut2a_State))
    const returnString = await mySkyClient.getFileContent(parseSkylink(Tut2a_State));
    console.log(returnString)
    setTut2a_ReturnValue(returnString.data)
  };

  const Tut_UploadFile = async () => {
    // Entry point of all SkynetClients 
    // - you should leave this empty on a production system
    // e.g. const mySkyClient = new SkynetClient();
    try{
      const mySkyClient = new SkynetClient("https://siasky.net");
      var blob = new Blob(
        [
          Tut3_Text
        ],
        { type: 'text/html' }
      );
      // Open a new tab in your browser
      const returnString = await mySkyClient.uploadFile(blob)
      console.log(returnString)
      setTut4_ReturnValue(returnString.skylink)
    }
    catch (error)
    {
      console.log(error.message);
    }
  };


  const Tut_40_CreateUserSeedForYourApp = async () => {
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
    setTut_40_ReturnValue(childSeed)
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
    
        const childSeed = deriveChildSeed(masterKey.privateKey, userID)

        const childKeys = genKeyPairFromSeed(childSeed)
    
        // Writing Data to client db
        // "This is some example JSON data new. From antAPI"
        const json = { example: Tut_50_Data , moreStuffs: "you can add more stuffs..." }
        try {
          const returnValue = await mySkyClient.db.setJSON(childKeys.privateKey, dataKey, json)
          console.log(returnValue)
          setTut_50_ReturnValue(returnValue.skylink)
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
        setTut_50_ReturnValue2(data.example)
      } catch (error) {
        console.log(error);
      }
      }
      catch (error)
      {
        console.log(error.message);
      }
  }


  const Tut_55_Json = async() => {
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

      // Get discoverable JSON data from the given path.
      const { data, skylink } = await mySky.getJSON(Tut_55_Path);
      console.log(data)
      console.log(skylink)
      setTut_55_RV1(data.message)
      setTut_55_RV2(skylink)
    } catch (error) {
      console.log(error)
    }
  }

  const Tut_56_Json = async() => {
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

      // Set discoverable JSON data from the given path.
      const { data, skylink } = await mySky.setJSON(Tut_56_Path, { message: Tut_56_Message });
      console.log(data)
      console.log(skylink)
      setTut_56_RV1(data.message)
      setTut_56_RV2(skylink)
    } catch (error) {
      console.log(error)
    }

  }

  const Tut_60_Dac = async() => {   
      try {
        const client = new SkynetClient("https://siasky.net");
        const mySky = await client.loadMySky("MyAppDomain");

        // Initialize DAC, auto-adding permissions.
        const dac = new ContentRecordDAC()
        await mySky.loadDacs(dac);
        const res = await dac.recordNewContent({skylink: Tut_60_SkyLink, metadata: {action:"NotInUse?"}})
        console.log(res)
        setTut_60_ReturnValue(res.submitted)
      }
      catch (error)
      {
        console.log(error.message)
      }
  }

  const Tut_61_Dac = async() => {   
    try {
      const client = new SkynetClient("https://siasky.net");
      const mySky = await client.loadMySky("MyAppDomain");

      // Initialize DAC, auto-adding permissions.
      const dac = new ContentRecordDAC()
      await mySky.loadDacs(dac);
      const res = await dac.recordInteraction({skylink: Tut_61_SkyLink, metadata: {action:Tut_61_Action}})
      console.log(res)
      setTut_61_ReturnValue(res.submitted)
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
            <Paper className={classes.paper} alignitems="center">
            <ReactMarkdown source={title_md} />
            </Paper>
          </Grid>
        </Grid>



        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut1_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} required label="SkynetPortal" value={Tut1_URL} onChange={(event) => setTut1_URL(event.target.value)} variant="standard">https://siasky.net</TextField> <br></br><br></br>
              <TextField style={{width: "95%"}} required label="YourAppDomain" onChange={(event) => setTut1_MyDomain(event.target.value)} value={Tut1_MyDomain} variant="standard">MyAppDomain</TextField><br></br><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_InitSkyNetClient()}>TriggerAPI</Button><br></br><br></br>
              <TextField style={{width: "95%"}} id="tut_rv1" label="ReturnValue - UserID" readOnly value={Tut1_ReturnValue} variant="standard"></TextField><br></br><br></br>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut1a_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_Logout()}>Logout</Button><br></br><br></br>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut2_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="sialink://" onChange={(event) => setTut2_State(event.target.value)} value={Tut2_State} variant="standard" helperText="sialink"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_OpenFile()}>Open a file on Skynet</Button>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut3_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="sialink://" onChange={(event) => setTut2a_State(event.target.value)} value={Tut2a_State} variant="standard" helperText="sialink"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_ReadFile()}>Read a file on Skynet</Button>
              <TextField style={{width: "95%"}} label="ReturnValue - RawHTML" readOnly value={Tut2a_ReturnValue} variant="standard"></TextField><br></br>
            </Paper>
          </Grid>
        </Grid>
              
        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut4_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="My User Text" onChange={(event) => setTut3_Text(event.target.value)} value={Tut3_Text} variant="standard"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_UploadFile()}>UploadText</Button><br></br>
              <TextField style={{width: "95%"}} label="ReturnValue - SiaLink" readOnly value={Tut4_ReturnValue} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item xs={12}>
            <Paper className={classes.paper} alignitems="center">
              <ReactMarkdown source={myuser_md} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
            <ReactMarkdown source={myuserseeds_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="App Domain" onChange={(event) => setTut_40_AppDomain(event.target.value)} value={Tut_40_AppDomain} variant="standard"></TextField><br></br><br></br>
              <TextField style={{width: "95%"}} label="App MasterSeed" onChange={(event) => setTut_40_AppMasterSeed(event.target.value)} value={Tut_40_AppMasterSeed} variant="standard"></TextField><br></br><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_40_CreateUserSeedForYourApp()}>Create Child Seed</Button><br></br><br></br>
              <TextField style={{width: "95%"}} label="ReturnValue - ChildSeed" readOnly value={Tut_40_ReturnValue} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        {/* SkynetClient-SkyDB UserData Handling(Browser-JS) */}
        <Grid container className={classes.tut_item}>
          <Grid item xs={12}>
            <Paper className={classes.paper} alignitems="center">
              <ReactMarkdown source={myuserdata_md} /></Paper>
          </Grid>
        </Grid>


        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut_50_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="UserData" onChange={(event) => setTut_50_Data(event.target.value)} value={Tut_50_Data} variant="standard"></TextField><br></br><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_50_WritingData()}>Write Data</Button><br></br><br></br>
              <TextField style={{width: "95%"}} label="ReturnValue" readOnly value={Tut_50_ReturnValue} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut_51_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_50_ReadingData()}>Read Data</Button>
              <TextField style={{width: "95%"}} label="ReturnValue" readOnly value={Tut_50_ReturnValue2} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut_55_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="Message" onChange={(event) => setTut_55_Path(event.target.value)} value={Tut_56_Path} variant="standard"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_55_Json()}>Get Json</Button>
              <TextField style={{width: "95%"}} label="ReturnValue1" readOnly value={Tut_55_RV1} variant="standard"></TextField>
              <TextField style={{width: "95%"}} label="ReturnValue2" readOnly value={Tut_55_RV2} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
              <ReactMarkdown source={tut_56_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="Message" onChange={(event) => setTut_56_Path(event.target.value)} value={Tut_56_Path} variant="standard"></TextField><br></br>
              <TextField style={{width: "95%"}} label="Message" onChange={(event) => setTut_56_Message(event.target.value)} value={Tut_56_Message} variant="standard"></TextField><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_56_Json()}>Set Json</Button>
              <TextField style={{width: "95%"}} label="ReturnValue1" readOnly value={Tut_56_RV1} variant="standard"></TextField>
              <TextField style={{width: "95%"}} label="ReturnValue2" readOnly value={Tut_56_RV2} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        
        

        {/* SkynetClient-SkyDB DAC Handling(Browser-JS) */}
        <Grid container className={classes.tut_item}>
          <Grid item xs={12}>
            <Paper className={classes.paper} alignitems="center">
              <ReactMarkdown source={mydac_md} />
            </Paper>          
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
            <ReactMarkdown source={mydaccreate_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="SkyLink" onChange={(event) => setTut_60_SkyLink(event.target.value)} value={Tut_60_SkyLink} variant="standard"></TextField><br></br><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_60_Dac()}>Create</Button><br></br><br></br>
              <TextField style={{width: "95%"}} label="ReturnValue" readOnly value={Tut_60_ReturnValue} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>

        <Grid container className={classes.tut_item}>
          <Grid item className={classes.tut_left} xs={8}>
            <Paper className={classes.paper}>
            <ReactMarkdown source={mydacinteract_md} />
            </Paper>
          </Grid>
          <Grid item className={classes.tut_right} xs={4}>
            <Paper className={classes.paper}>
              <TextField style={{width: "95%"}} label="SkyLink" onChange={(event) => setTut_61_SkyLink(event.target.value)} value={Tut_61_SkyLink} variant="standard"></TextField><br></br><br></br>
              <TextField style={{width: "95%"}} label="Action" onChange={(event) => setTut_61_Action(event.target.value)} value={Tut_61_Action} variant="standard"></TextField><br></br><br></br>
              <Button variant='outlined' style={{ color: 'black' }} onClick={() => Tut_61_Dac()}>Interact</Button><br></br><br></br>
              <TextField style={{width: "95%"}} label="ReturnValue" readOnly value={Tut_61_ReturnValue} variant="standard"></TextField>
            </Paper>
          </Grid>
        </Grid>


      </Grid>
    </div>
  );
}
