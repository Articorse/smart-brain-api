const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const db = require('knex')({
    client: 'pg',
    connection: {
      host : 'postgresql-regular-93426',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('It\'s working!')});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', (res, req) => {image.handleImage(res, req, db)}); // Alternative Syntax
app.post('/imageurl', image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on ${process.env.PORT}.`)
});