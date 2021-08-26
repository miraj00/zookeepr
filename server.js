const fs = require('fs');
const path = require('path');

const express = require('express');

// Applications served over Heroku as well as most hosts must run on port 80. If the host uses HTTPS, then the port would be set to 443.
const PORT = process.env.PORT || 3001;
// To instantiate the server, add the following code to server.js:
const app = express();

//------middleware --( for POST data ( to accept incoming data) )--------------------------------

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// this will make all public folder files available to front end
app.use(express.static('public'));

//----------------------------------------------------
const { animals } = require('./data/animals');

//-----------------------------------------------------------

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
          personalityTraitsArray = [query.personalityTraits];
        } else {
          personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
          // Check the trait against each animal in the filteredResults array.
          // Remember, it is initially a copy of the animalsArray,
          // but here we're updating it for each trait in the .forEach() loop.
          // For each trait being targeted by the filter, the filteredResults
          // array will then contain only the entries that contain the trait,
          // so at the end we'll have an array of animals that have every one 
          // of the traits when the .forEach() loop is finished.
          filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
          );
        });
      }
        
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }


  function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }

  function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
  }


  function createNewAnimal(body, animalsArray) {
    // console.log(body);
    // our function's main code will go here!
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
      path.join(__dirname, './data/animals.json'),
      JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;

    // return finished code to post route for response
    //return body;
  }




//-------Routes set -( query for multi  and params for singular----------------------------------------
// To add the route, type the following code just before app.listen():
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
      }
    res.json(results);
  });
  
  
   // res.json(animals);
   // res.send('Hello!');
   // });

   // A param route must come after the other GET route. 
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result){  
    res.json(result);
    } else {
    res.send(404);
    }
  });

  // -- route to serve animal.html page ---
  app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
  });

  // -- route to serve zookeepers.html page ---
  app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });

  // --- wildcard route -- will direct to homepage as a response --- 
  // -- this * route should always come last ----
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


  // this represents client requesting server to accept data
  app.post('/api/animals', (req, res) => {
    
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      res.status(400).send('The animal is not properly formatted.');
    } else {   
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal); 
    
    // req.body is where our incoming content will be
    // console.log(req.body);
    // res.json(req.body);
    }
  });


  //--- This route respond with an HTML page to display in the browser.--------
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

//----------listen and set Port -----( this should be always at the end )---------------------------------------------
// To make our server listen, add the following code to the end 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });