const app = require('./app');

const port = process.env.PORT;

app.express.listen(port || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`server up on port ${port || 3000}`);
});
