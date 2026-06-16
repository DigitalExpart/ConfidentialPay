const app = require('./app');
const PORT = process.env.PORT || 4000;

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`ConfidentialPay backend listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
});

module.exports = server;
