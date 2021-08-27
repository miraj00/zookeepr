const path = require('path');
const router = require('express').Router();



//-------Routes set -( query for multi  and params for singular----------------------------------------
// To add the route, type the following code just before app.listen():


// -- route to serve animal.html page ---
  
//--- This route respond with an HTML page to display in the browser.--------
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });


  router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
  });

  // -- route to serve zookeepers.html page ---
  router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
  });


    // --- wildcard route -- will direct to homepage as a response --- 
  // -- this * route should always come last ----
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });


  module.exports = router;