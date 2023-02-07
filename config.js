const port = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'book-directory';

module.exports = port;
module.exports = DB_HOST;
module.exports = DB_NAME;
module.exports = DB_PASSWORD;
module.exports = DB_USER;
