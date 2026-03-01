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

// // example search query
// db.all(
//   "SELECT * FROM plants WHERE plantName LIKE ?",
//   ["%Aloe%"],
//   (err, rows) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.table(rows);
//     }
//     db.close();
//   }
// );

// Delete rows matching the plant name
db.run(
  "DELETE FROM plants WHERE plantName = ?",
  ["Chinese Lantern Plant"],
  function (err) {
    if (err) {
      console.error("Error deleting plant:", err.message);
    } else {
      console.log(`Deleted ${this.changes} row(s)`);
    }
    db.close();
  }
);