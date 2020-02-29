const { Pool } = require('pg');

const dbString = 'postgres://vhmzyarq:5Nod0M1ddxJyxhyNCrWkm1frUXwYVMOj@isilo.db.elephantsql.com:5432/vhmzyarq';

const pool = new Pool(dbString);

module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query: ${text}\n with params: ${params}`)
    return pool.query(text, params, callback)
  }
}