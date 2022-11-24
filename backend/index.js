"use strict"

const express = require('express');
const app = express();
const cors = require('cors');

let users = [];

app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.json());
app.listen(3000);
console.log(`app running at http://localhost:3000`);

app.post('/register', (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }


  try {
    if (data.username != '' || data.email != '' || data.password != '') {
      users.push(data)
      console.log(users)
      console.log("You successfully registered !")
      res.send(`You successfully registered ! `)

    } else {
      throw Error('All those fields cannot be empty')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong')
  }

})

app.post('/login', (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    if (data.email != '' || data.password != '') {
      console.log("Email and password aren't empty")
      //going through array of users to check for email
      let checkIfTrue;
      for (let item in users) {
        console.log(`Item = ${item}`)
        console.log(`Item type:${typeof(item)}`)
        console.log(users)

        if (item.email == data.email) {
          console.log("Email exists")
          //checking if password is the same as the one from the chosen email
          if (item.password == data.password) {
            console.log("YES, your password is correct!")
            checkIfTrue = true;
            break
          } else {
            throw Error('NOPE, your password is incorrect')
          }
        } else {
          console.log(`Body password: ${item.password}, Password: ${data.password}`)
          console.log(`Body password: ${typeof(item.password)}, Password: ${typeof(data.password)}`)
          checkIfTrue = false
        }
      }
      //final if statement checking if every info given is okay to log in
      if (checkIfTrue) {
        res.send("YES, you have successfully been logged in!")
      } else {
        res.send("EUUUH, your email doesn't exist in our server")
      }
    } else {
      throw Error('All those fields cannot be empty')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Something went wrong')
  }

})