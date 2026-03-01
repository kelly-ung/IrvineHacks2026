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
  ["%Jasmine%"],
  (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      console.table(rows);
    }
    db.close();
  }
);

// Delete rows matching the plant name
// db.run(
//   "DELETE FROM plants WHERE plantName = ?",
//   ["Chinese Lantern Plant"],
//   function (err) {
//     if (err) {
//       console.error("Error deleting plant:", err.message);
//     } else {
//       console.log(`Deleted ${this.changes} row(s)`);
//     }
//     db.close();
//   }
// );

// update image url
// db.run(
//   "UPDATE plant_images SET imageUrl = ? WHERE plantName LIKE ?",
//   ["https://images.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_224264125-min.jpg", "%Cilantro%"],
//   function (err) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`Rows updated: ${this.changes}`);
//     }
//     db.close();
//   }
// );

// db.run("ALTER TABLE plants ADD COLUMN description TEXT;", (err) => {
//   if (err) {
//       console.error(err);
//     } else {
//       console.log(`table updated: ${this.changes}`);
//     }
//     db.close();
//   }
// );
