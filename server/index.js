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
        classification TEXT
      )
    `);

  db.run(`
    CREATE TABLE IF NOT EXISTS plant_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plantName TEXT,
      imageUrl TEXT,
      FOREIGN KEY (plantName) REFERENCES plants(plantName) ON DELETE CASCADE
    )
  `);
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// search query for plant name case insensitive
app.get("/search", (req, res) => {
  const { name, classification } = req.query;

  let query = `
    SELECT p.*, i.imageUrl
    FROM plants p
    LEFT JOIN plant_images i ON p.plantName = i.plantName
    WHERE 1=1
  `;
  const params = [];

  if (name) {
    query += " AND LOWER(p.plantName) LIKE LOWER(?)";
    params.push(`%${name}%`);
  }

  if (classification) {
    query += " AND LOWER(p.classification) LIKE LOWER(?)";
    params.push(`%${classification}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json(err);

    // Aggregate images into an array per plant
    const plantsMap = {};
    rows.forEach(row => {
      if (!plantsMap[row.plantName]) {
        plantsMap[row.plantName] = {
          plantName: row.plantName,
          growth: row.growth,
          soil: row.soil,
          sunlight: row.sunlight,
          watering: row.watering,
          fertilizationType: row.fertilizationType,
          difficultyOfCare: row.difficultyOfCare,
          classification: JSON.parse(row.classification),
          images: [],
        };
      }
      if (row.imageUrl) plantsMap[row.plantName].images.push(row.imageUrl);
    });

    res.json(Object.values(plantsMap));
  });
});

// filters
app.get("/filters", (req, res) => {
  db.all("SELECT classification, difficultyOfCare, growth FROM plants", [], (err, rows) => {
    if (err) return res.status(500).json(err);

    const classificationsSet = new Set();
    const difficultySet = new Set();
    const growthSet = new Set();

    rows.forEach(row => {
      // Split comma-separated classification
      if (row.classification) {
        row.classification.split(",").map(c => c.trim()).forEach(c => classificationsSet.add(c));
      }

      if (row.difficultyOfCare) difficultySet.add(row.difficultyOfCare);
      if (row.growth) growthSet.add(row.growth.trim());
    });

    res.json({
      classifications: Array.from(classificationsSet).sort(),
      difficulty: Array.from(difficultySet).sort(),
      growth: Array.from(growthSet).sort(),
    });
  });
});


// Start server
app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});
