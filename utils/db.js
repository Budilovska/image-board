var spicedPg = require("spiced-pg");
var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/imageboard");
}

exports.getImages = function() {
    return db.query("SELECT * FROM images ORDER BY id DESC LIMIT 9");
};

exports.insertImages = function(url, username, title, description) {
    return db.query(
        "INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING id, url, title",
        [url, username, title, description]
    );
};

exports.getImageById = function(id) {
    return db.query("SELECT * FROM images WHERE id=$1", [id]);
};

exports.addComment = function(image_id, author, comment) {
    return db.query(
        "INSERT INTO comments (image_id, author, comment) VALUES ($1, $2, $3) RETURNING *",
        [image_id, author, comment]
    );
};

exports.getAllComments = function(id) {
    return db.query("SELECT * FROM comments WHERE image_id=$1", [id]);
};

exports.getMoreImages = function(lastId) {
    return db.query(
        "SELECT * FROM images WHERE id < $1 ORDER BY id DESC LIMIT 9",
        [lastId]
    );
};

exports.getPrevAndNextId = function(id) {
    return db
        .query(
            "SELECT (SELECT id FROM images WHERE id < $1 ORDER BY id DESC LIMIT 1) AS prev, (SELECT id FROM images WHERE id > $1 ORDER BY id ASC LIMIT 1) as next",
            [id]
        )
        .then(({ rows }) => rows);
};
