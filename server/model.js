const { Pool } = require('pg');

const { connectionString } = require('./_secrets/elephantSecret');

const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query: ${text}`);
    return pool.query(text, params, callback);
  }
}