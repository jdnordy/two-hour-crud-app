const tacoController = {};
// require in db model
const db = require('./model');

tacoController.getTacos = (req, res, next) => {
  const getTacos = `SELECT * FROM tacos`;

  db.query(getTacos)
    .then(data => {
      res.locals.tacos = data.rows;
      return next();
    })
    .catch(err => next(err))
};

tacoController.addTacos = (req, res, next) => {
  const addTacos = {
    text: `
      INSERT INTO tacos (ingredient) 
      VALUES ($1)
      RETURNING *;
    `,
    values: [req.body.ingredient]
  }

  db.query(addTacos)
    .then(data => {
      res.locals.tacos = data.rows[0];
      return next();
    })
    .catch(err => next(err));
};

tacoController.deleteTacos = (req, res, next) => {
  const deleteTacos = {
    text: `
      DELETE FROM tacos
      WHERE _id = $1;
    `,
    values: [req.body.tacoId]
  }

  db.query(deleteTacos)
    .then(data => next())
    .catch(err => next(err));
}

tacoController.updateTacos = (req, res, next) => {
  const updateTacos = {
    text: `
      UPDATE tacos
      SET ingredient = $1
      WHERE _id = $2
      RETURNING *;
    `,
    values: [req.body.ingredient, req.body.tacoId]
  }

  db.query(updateTacos)
    .then(data => {
      res.locals.tacos = data.rows[0];
      return next();
    })
    .catch(err => next(err));
}


module.exports = tacoController;