const express = require(`express`);
const app = express();

require(`dotenv`).config();

const swaggerUi = require(`swagger-ui-express`);
const swaggerDocument = require(`./swagger.json`);

const port = process.env.PORT || 3000;

const externalFileControllers = require(`./controllers/external-file.js`);
const internalFileControllers = require(`./controllers/internal-file.js`);

app.get(`/`, (req, res) => {
  res.send(`Welcome !`);
});

app.get(
  `/external-file-sources/:bucket`,
  externalFileControllers.copyExternalFileSources
);

app.get(
  `/buckets/:bucket`,
  internalFileControllers.getBucketData
);

app.use(`/documentation`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err) {
    throw err.message;
  }
  // err is error from next(e) function
  // you can do all error processing here, logging, parsing error messages, etc...
  return res.status(500).send(`Something broke!`);
});

app.listen(port, () => {
  console.log(`file manager app listening on port ${port}`);
});
