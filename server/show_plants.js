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
// db.all(
//   "SELECT * FROM plants WHERE plantName LIKE ?",
//   ["%Jasmine%"],
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

// // update image url
// db.run(
//   "UPDATE plant_images SET imageUrl = ? WHERE plantName LIKE ?",
//   [
//     "https://www.outsidepride.com/images/products/detail/gardenflower/birdofparadise.jpg", 
//     "%Bird Of Paradise%" 
//   ],
//   function (err) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(`Rows updated: ${this.changes}`);
//     }
//     db.close(); 
//   }
// );

const plant = "Snake Plant";
const urls = [
  "https://www.michlers.com/cdn/shop/products/SnakePlant.jpg?v=1675204628&width=2048",
  "https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w",
];

// Loop through your URLs and insert them as individual rows
urls.forEach((url) => {
  db.run(
    "INSERT INTO plant_images (plantName, imageUrl) VALUES (?, ?)",
    [plant, url],
    function (err) {
      if (err) console.error(err);
      else console.log(`Inserted image for ${plant}. Row ID: ${this.lastID}`);
    }
  );
});


// db.run("ALTER TABLE plants ADD COLUMN description TEXT;", (err) => {
//   if (err) {
//       console.error(err);
//     } else {
//       console.log(`table updated: ${this.changes}`);
//     }
//     db.close();
//   }
// );
