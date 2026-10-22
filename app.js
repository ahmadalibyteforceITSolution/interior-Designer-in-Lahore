// Namecheap cPanel Phusion Passenger Startup File
const app = require('./server/server');
const PORT = process.env.PORT || 5000;

if (app.connectToDatabase) {
  app.connectToDatabase().catch(err => {
    console.warn('Initial MongoDB connect warning:', err.message);
  });
}

const server = app.listen(PORT, () => {
  console.log(`Spaces & Places Live Full-Stack Server running on port ${PORT}`);
});

module.exports = app;
