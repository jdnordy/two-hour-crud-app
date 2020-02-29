const { Pool } = require('pg');

const connectionString = 'postgres://vhmzyarq:5Nod0M1ddxJyxhyNCrWkm1frUXwYVMOj@isilo.db.elephantsql.com:5432/vhmzyarq';

const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query: ${text}`);
    return pool.query(text, params, callback);
  }
}