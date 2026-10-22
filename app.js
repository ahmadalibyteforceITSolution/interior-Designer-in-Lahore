// Namecheap cPanel Phusion Passenger Startup File
const app = require('./server/server');
const PORT = process.env.PORT || 5000;

if (process.env.PASSENGER_APP_ENV || require.main === module) {
  app.listen(PORT, () => {
    console.log(`Spaces & Places Live Server running on port ${PORT}`);
  });
}

module.exports = app;
