import mysql from 'mysql';
import config from './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// API Routes
// TODO: Implement the following endpoints:
// GET /api/movies - retrieve all movies from database  
// POST /api/reviews - create a new movie review
app.get('/api/movies', (req, res) => {
  const connection = mysql.createConnection(config);
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      res.status(500).json({ error: 'Failed to retrieve movies' });
    } else {
      res.json(results);
    }

    connection.end();
  });
});

// POST /api/reviews - create a new movie review
app.use(express.json());

app.post('/api/reviews', (req, res) => {
  const { movieID, userID, reviewTitle, reviewContent, reviewScore } = req.body;

  const connection = mysql.createConnection(config);
  const query = 'INSERT INTO Review (movieID, userID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)';

  const values = [movieID, userID, reviewTitle, reviewContent, reviewScore];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add review' });
    } else {
      res.status(201).json({ message: 'Review added' });
      connection.end();
    }
  });

});
// Search Component
app.post('/api/search', async (req, res) => {
  const { actor, director, title } = req.body;

  const connection = mysql.createConnection(config);

  const [actorFirst, ...actorRest] = actor?.trim()?.split(' ') || [];
  const actorLast = actorRest.join(' ');

  const [directorFirst, ...directorRest] = director?.trim()?.split(' ') || [];
  const directorLast = directorRest.join(' ');

  const query = `
    SELECT 
      M.name AS title,
      GROUP_CONCAT(DISTINCT CONCAT(D.first_name, ' ', D.last_name) SEPARATOR ', ') AS directors,
      IFNULL(ROUND(AVG(R.reviewScore), 2), 'N/A') AS avg_rating,
      GROUP_CONCAT(DISTINCT R.reviewContent SEPARATOR '||') AS reviews
    FROM movies M
    JOIN movies_directors MD ON M.id = MD.movie_id
    JOIN directors D ON MD.director_id = D.id
    JOIN roles RL ON M.id = RL.movie_id
    JOIN actors A ON RL.actor_id = A.id
    LEFT JOIN Review R ON M.id = R.movieID
    WHERE
      (? = '' OR M.name = ?) AND
      (? = '' OR (A.first_name = ? AND A.last_name = ?)) AND
      (? = '' OR (D.first_name = ? AND D.last_name = ?))
    GROUP BY M.id;
  `;

  const params = [
    title || '', title || '',
    actor || '', actorFirst || '', actorLast || '',
    director || '', directorFirst || '', directorLast || ''
  ];

  connection.query(query, params, (err, rows) => {
    if (err) {
      console.error("SQL error:", err.sqlMessage);
      res.status(500).json({ error: "Server error" });
    } else {
      const results = rows.map(row => ({
        title: row.title,
        directors: row.directors,
        avg_rating: row.avg_rating === 'N/A' ? 'N/A' : Number(row.avg_rating).toFixed(2),
        ...(row.reviews ? { reviews: row.reviews.split('||').join('\n') } : {})
      }));

      res.json(results);
    }

    connection.end();
  });
});

// Get top 5 rated movies (Landing page)
app.get('/api/top-movies', (req, res) => {
  const connection = mysql.createConnection(config);
  const query = `
    SELECT M.name AS title, ROUND(AVG(R.reviewScore), 2) AS avg_rating
    FROM movies M
    JOIN Review R ON M.id = R.movieID
    GROUP BY M.id
    ORDER BY avg_rating DESC
    LIMIT 5;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top movies:', err);
      res.status(500).json({ error: 'Failed to fetch top movies' });
    } else {
      res.json(results);
    }
    connection.end();
  });
});

// Get total number of reviews (Landing page)
app.get('/api/review-count', (req, res) => {
  const connection = mysql.createConnection(config);
  const query = 'SELECT COUNT(*) AS count FROM Review';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching review count:', err);
      res.status(500).json({ error: 'Failed to fetch review count' });
    } else {
      res.json(results[0]);
    }
    connection.end();
  });
});

// Random matchups (MyPage)
app.get('/api/matchup', (req, res) => {
  const connection = mysql.createConnection(config);

  const query = `
    SELECT 
      m1.id AS movie1_id, m1.name AS movie1_name, m1.poster_url AS movie1_poster,
      m2.id AS movie2_id, m2.name AS movie2_name, m2.poster_url AS movie2_poster,
      matchups.matchup_id AS matchup_id
    FROM matchups
    JOIN movies m1 ON matchups.movie1_id = m1.id
    JOIN movies m2 ON matchups.movie2_id = m2.id
    ORDER BY RAND() LIMIT 1
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Matchup fetch error:', err);
      res.status(500).json({ error: 'Failed to fetch matchup' });
    } else {
      res.json(results[0]); 
    }
    connection.end();
  });
});




// Submit a vote (MyPage)
app.post('/api/vote', (req, res) => {
  const { matchup_id, winner_movie_id } = req.body;
  const connection = mysql.createConnection(config);

  const query = `
    INSERT INTO matchvotes (matchup_id, winner_movie_id)
    VALUES (?, ?)
  `;

  connection.query(query, [matchup_id, winner_movie_id], (err, results) => {
    if (err) {
      console.error('❌ Error saving vote:', err);
      res.status(500).json({ error: 'Failed to save vote' });
    } else {
      res.status(201).json({ message: 'Vote saved' });
    }
    connection.end();
  });
});




app.listen(port, () => console.log(`Listening on port ${port} `)); //for the dev version
