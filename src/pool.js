const pg = require("pg");

// ----------------------------------------------------
// Normally, we create a pool like this:
// const pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   // ...
// });

// module.exports = pool;
// ----------------------------------------------------

// But since we want to connect to multiple dbs we will do it like this

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    // We run a test query here to make sure that we can
    // connect to the db. Without a test query we would
    // not know if we can actually connect!
    return this._pool.query("SELECT 1 + 1;");
  }

  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
