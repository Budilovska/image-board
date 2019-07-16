var spicedPg = require("spiced-pg");
var db;

if(process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL)
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");
}

exports.getImages = function() {
    return db.query("SELECT url, title FROM images");
};

exports.insertImages = function(url, username, title, description) {
    return db.query("INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING url, title", [url, username, title, description]);
};
