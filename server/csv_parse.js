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
//     const { plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, classification } = row;
//     db.run(
//       `INSERT INTO plants (plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, classification) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [plantName, growth, soil, sunlight, watering, fertilizationType, difficultyOfCare, JSON.stringify(classification)],
//       (err) => {
//         if (err) console.error("Insert error:", err);
//       }
//     );
//   })
//   .on("end", () => {
//     console.log("CSV file successfully processed!");
//     db.close();
//   });


// bulk update table with descriptions from new csv file
const fs = require("fs");
const csv = require("csv-parser");
const sqlite3 = require("sqlite3").verbose();

// Connect to DB
const db = new sqlite3.Database("./plants.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected to SQLite database");
});

const csvFilePath = "./csvfiles/plantdescriptions.csv"; // new file

// ... existing connection code ...

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    // Note: CSV headers are case-sensitive. 
    // Using the headers from our generated CSV: "Plant Name" and "Description"
    const name = row['plantName'];
    const desc = row['description']; 

    db.run(
      `UPDATE plants SET description = ? WHERE plantName = ?`,
      [desc, name],
      function (err) {
        if (err) {
          console.error(`Error updating ${name}:`, err.message);
        } else if (this.changes === 0) {
          console.log("No match found in DB for:", name);
        }
      }
    );
  })
  .on("end", () => {
    console.log("Description update processing finished!");
    // Note: db.close() inside 'end' can sometimes trigger before 
    // the last async db.run finishes. For a one-time bulk update, 
    // it's usually okay, but keep an eye on it!
  });

// // add to new table
// const fs = require("fs");
// const csv = require("csv-parser");
// const sqlite3 = require("sqlite3").verbose();

// // Connect to DB
// const db = new sqlite3.Database("./plants.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) console.error("DB error:", err);
//   else console.log("Connected to SQLite database");
// });

// // Path to CSV
// const csvFilePath = "./csvfiles/final_merged_output.csv";

// fs.createReadStream(csvFilePath)
//   .pipe(csv()) // default: first row is header
//   .on("data", (row) => {
//     const plantName = (row.plantName || "").trim();
//     const urlsString = row.urls || ""; // guard against undefined
//     if (!plantName || !urlsString) return; // skip invalid rows

//     const urls = urlsString.split(",").map(u => u.trim()).filter(Boolean);

//     urls.forEach((url) => {
//       db.run(
//         `INSERT INTO plant_images (plantName, imageUrl) VALUES (?, ?)`,
//         [plantName, url],
//         (err) => {
//           if (err) console.error(`Insert error for ${plantName}:`, err.message);
//         }
//       );
//     });
//   })
//   .on("end", () => {
//     console.log("All images inserted into plant_images!");
//     db.close();
//   });