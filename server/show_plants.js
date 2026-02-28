const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./plants.db");
// for testing purposes to see if insert worked

// view all entries 
// db.all("SELECT * FROM plants", [], (err, rows) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.table(rows);
//   }
//   db.close();
// });

// example search query
db.all(
  "SELECT * FROM plants WHERE plantName LIKE ?",
  ["%Aloe%"],
  (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      console.table(rows);
    }
    db.close();
  }
);