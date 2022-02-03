require('dotenv').config();
const express = require('express');
const mysql2 = require('mysql2');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: process.env.ACTIVE_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.CURRENT_DB
  },
  console.log(`Connected to the movie database.`)
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/movies', (req, res)=>{
  console.log(`${req.method} request for movie list made.`);
  db.query('SELECT title, description FROM movies', (err, result)=>{
    if(err){throw err}
    res.json(result)
  })
})

app.get('/api/movies/:title', (req, res)=>{
  console.log(`${req.method} request for the movie ${req.params.title} made.`);
  db.query(`SELECT title, description FROM movies WHERE title="${req.params.title}"`, (err, result)=>{
    if(err){throw err}
    res.json(result)
    console.log(result)
  })
})

app.get('/api/reviews', (req, res)=>{
  console.log(`${req.method} request for reviews made.`);
  db.query('SELECT title, review FROM movies JOIN reviews ON id=movie', (err, result)=>{
    if(err){throw err}
    res.json(result);
  })
})

app.get('/api/reviews/:movie', (req, res) =>{
  console.log(`${req.method} request for ${req.params.movie} reviews made.`);
  const reqMovie = req.params.movie;
  db.query(`SELECT title, review FROM movies JOIN reviews ON id=movie WHERE title='${reqMovie}';`, (err, result)=>{
    if (err) {throw err}
    res.json(result)
    console.log(result);
    
  })
})

app.post('/api/movies/add-movie', (req, res)=>{
  console.log(`${req.method} request made to add a movie.`);
  console.log(req.body);
  if ((!req.body.movie) || (!req.body.description)){
    res.send('You have to include both a title and description to add a movie to the database.')
  } else {
    const titleInpt = req.body.movie;
    const descInpt = req.body.description;
    db.query(`INSERT INTO movies (title, description) VALUES ('${titleInpt}', '${descInpt}');`);
    const response = {
      status: `${titleInpt} was added!`
    }
    res.json(response);
  }
})

app.post('/api/add-review', (req, res)=>{
  console.log(`${req.method} request made to add a review.`);
  console.log(req.body);
  if ((!req.body.movie) || (!req.body.review)){
    res.send('You have to include both a movie and review to add a review to the database.')
  } else {
    const movieInpt = req.body.movie;
    const revInpt = req.body.review;
    db.query(`SELECT id FROM movies WHERE title='${movieInpt}';`, (err, result)=>{
      if(err){throw err}
      // console.log("id: " + result);
      const movieID = result[0].id;
      console.log(movieID);
      db.query(`INSERT INTO reviews (movie, review) VALUES (${movieID}, '${revInpt}');`, (err, data)=>{
        if(err){throw err};
        // console.log(data);
      });
      const response = {
        status: `Your ${movieInpt} review was added!`
      }
      res.json(response);
      // console.log(res);
      // return response;
    })
  }
})



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});