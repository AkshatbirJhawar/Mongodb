const express = require('express');
const mongoose = require('mongoose');
const movieData = require('./movies'); // small dataset, safe to require at top

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/moviesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  director: String,
  genres: [String],
  rating: Number,
  reviews: [{ reviewer: String, score: Number }]
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Movies API!');
});

app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get('/seed', async (req, res) => {
  try {
    await Movie.deleteMany({});
    await Movie.insertMany(movieData);
    res.send("Database seeded successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start server
app.listen(8080, () => console.log('Server running on port 8080'));
