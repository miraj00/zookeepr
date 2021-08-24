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

