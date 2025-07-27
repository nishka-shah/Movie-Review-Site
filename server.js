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


app.listen(port, () => console.log(`Listening on port ${port} `)); //for the dev version
