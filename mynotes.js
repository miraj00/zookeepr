In command prompt, 

// You can use the `-y` flag to skip the package questionnaire and leave default answers
npm init -y

// # You can use `npm i` as a shortcut for `npm install`
npm i express

// Add the code to the top of Server.js
const express = require('express');

// To instantiate the server, add the following code to server.js:
const app = express();

// To make our server listen, add the following code to the end 
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

// running " npm start " on command line / terminal will show the message
in the preceding code (API server now on port 3001!) in the console. 

to stop the previous server, type " ctrl + c" and then "Y" at the prompt if any

  
//------- To setup heroku ------------------------------------------------------------

1) First time, signup at :  https://signup.heroku.com/login
2) download CLI at : https://devcenter.heroku.com/articles/heroku-cli
3) in command-line-type :  npm install -g heroku
4) Verify if installed by checking version type in command : heroku --version
5) To create Heroku application, in command line type: " heroku create ""

// ---- Just like github, you can push to heroku ----------------------

git add -A
git commit -m "Add Heroku"
git push heroku feature/MVP:main

//----------------------------------------------
In command line Typing : " heroku open "  will open file in browser

//--------------------------------------------------
for the route : app.get('/animals/:id', (req, res) => { })
In    /animals/123?id=24&params=50

req.params.id = 123
req.query.id = 24
req.query.params = 50

//--------------------------------------------------

app.get  ==== > is used by clients to get data from server
app.post ==== > this represents client requesting server to accept data 

 // Fetch API's default request method is GET,

 //------------------------------------------------------------
 
 Use  " npm start " to turn on server   and " ctrl + C " to turn off the server

 //--------------------------------------------------------------------

 Use insomnia to test get, post   from : https://insomnia.rest/

 //-------------------------------------------------------
 When we don't send data the server can use or understand, we respond with a 400 error.
 This indicates to the user that our server doesn't have any problems and we can understand
 their request, but they incorrectly made the request and we can't allow it to work.
 
 //---------------------------------------------------------
 If we want to send a POST request, We use req.body to access any incoming POST data.
 
 //-----------------------------------------------------------
 it may feel natural to open the page that way, we need to make sure that every time we test something
 on the front end that it is served from http://localhost:3001, or https://<your-heroku-app-name>.herokuapp.com 
 when it's in production.

//------Example link to test GET or post in Insomnia ------------------
      http://localhost:3001/api/animals
      http://localhost:3001/animals