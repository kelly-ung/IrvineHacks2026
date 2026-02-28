// BULK INSERT FROM CSV TO DB or BULK UPDATE URLS FROM CSV TO DB

// // bulk insert to db from csv file

// const fs = require("fs");
// const csv = require("csv-parser");
// const sqlite3 = require("sqlite3").verbose();

// // Connect to DB
// const db = new sqlite3.Database("./plants.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) console.error("DB error:", err);
//   else console.log("Connected to SQLite database");
// });

// // Path to CSV file
// const csvFilePath = "./csvfiles/plants_final_detailed.csv";

// fs.createReadStream(csvFilePath)
//   .pipe(csv())
//   .on("data", (row) => {
//     // Insert each row into the plants table
//     const { plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, classification, url } = row;
//     db.run(
//       `INSERT INTO plants (plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, classification, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, JSON.stringify(classification), url],
//       (err) => {
//         if (err) console.error("Insert error:", err);
//       }
//     );
//   })
//   .on("end", () => {
//     console.log("CSV file successfully processed!");
//     db.close();
//   });


// bulk update table with urls from new csv file
const fs = require("fs");
const csv = require("csv-parser");
const sqlite3 = require("sqlite3").verbose();

// Connect to DB
const db = new sqlite3.Database("./plants.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected to SQLite database");
});

const csvFilePath = "./csvfiles/plant_image_urls.csv"; // new file

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const { plantName, url } = row;

    db.run(
      `UPDATE plants SET url = ? WHERE plantName = ?`,
      [url, plantName],
      function (err) {
        if (err) {
          console.error("Update error:", err);
        } else if (this.changes === 0) {
          console.log("No match found for:", plantName);
        }
      }
    );
  })
  .on("end", () => {
    console.log("URL update complete!");
    db.close();
  });