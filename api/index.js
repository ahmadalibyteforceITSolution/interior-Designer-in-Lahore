const app = require('../server/server');
const { connectToDatabase } = require('../server/server');

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.warn('Database connect fallback:', err.message);
  }
  return app(req, res);
};
