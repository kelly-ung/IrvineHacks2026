const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Create / connect DB
const db = new sqlite3.Database("./plants.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error("DB error:", err);
  else console.log("SQLite database ready!");
});

// Create table
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS plants (
        plantName TEXT PRIMARY KEY,
        growth TEXT,
        soil TEXT, 
        sunlight TEXT,
        watering TEXT,
        fertilizationType TEXT,
        difficultyOfCare INTEGER,
        classification TEXT,
        url TEXT
    )
  `);
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// search query for plant name case insensitive
app.get("/search", (req, res) => {
  const { name, sunlight, difficulty, soil, classification } = req.query;

  // Start with a base query
  let query = "SELECT * FROM plants WHERE 1=1";
  const params = [];

  // Add filters dynamically
  if (name) {
    query += " AND LOWER(plantName) LIKE LOWER(?)";
    params.push(`%${name}%`);
  }

  if (sunlight) {
    query += " AND LOWER(sunlight) = LOWER(?)";
    params.push(sunlight);
  }

  if (difficulty) {
    query += " AND difficultyOfCare = ?";
    params.push(difficulty);
  }

  if (soil) {
    query += " AND LOWER(soil) = LOWER(?)";
    params.push(soil);
  }

  if (classification) {
    query += " AND LOWER(classification) LIKE LOWER(?)";
    params.push(`%${classification}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});



app.post("/plants", (req, res) => {
  const {
    plantName,
    growth,
    soil, 
    sunlight,
    watering,
    fertilizationType,
    difficultyOfCare,
    classification,
    url
  } = req.body;

  const sql = `
    INSERT INTO plants
    (plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, classification, url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [
      plantName,
      growth,
      soil,
      sunlight,
      watering,
      fertilizationType,
      difficultyOfCare,
      JSON.stringify(classification),
      JSON.stringify(url)
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});


// Start server
app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
