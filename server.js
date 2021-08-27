const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


const fs = require('fs');
const path = require('path');

const express = require('express');



// Applications served over Heroku as well as most hosts must run on port 80. If the host uses HTTPS, then the port would be set to 443.
const PORT = process.env.PORT || 3001 ;
// To instantiate the server, add the following code to server.js:
const app = express();



//------middleware --( for POST data ( to accept incoming data) )--------------------------------

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// this will make all public folder files available to front end
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//----------------------------------------------------
const { animals } = require('./data/animals');


//--------------All routes modularized to different files---------------------------------------------

//----------listen and set Port -----( this should be always at the end )---------------------------------------------
// To make our server listen, add the following code to the end 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });