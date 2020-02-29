const express = require('express');

const app = express();

const PORT = 3000;

const db = require('./model');




app.use((req, res) => {
  res.sendStatus(404);
});

// error handler
app.use((err, req, res, next) => {
  console.log(`Server error: ${err}`);
  res.status(400).json(`Server error: ${err}`);
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));