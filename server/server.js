const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const db = require('./model');

/**
 * PARSE THE BODY OF REQUEST
 */
app.use(express.json());

/**
 * HANDLE REQUEST FOR STATIC FILES
 */
app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));


app.get('/', (req, res) => {
  res.sendfile(path.resolve(__dirname, '../client/index.html'));
});

// handler for bad routes
app.use((req, res) => {
  res.sendStatus(404);
});

// error handler
app.use((err, req, res, next) => {
  console.log(`Server error: ${err}`);
  res.status(400).json(`Server error: ${err}`);
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));