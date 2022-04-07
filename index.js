import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';

// routes 
import routes from './routes/index.js';

const port = config.service.port || 3000;

// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
app.use('/', routes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Server listen to port
app.listen(port, () => {
  console.log(`server running on port ${port}`);
})

export default app;