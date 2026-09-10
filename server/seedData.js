const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = async function seedDatabase(models) {
  const { SiteSettings, Page, Blog, User } = models;
  const dataDir = path.resolve(__dirname, 'data');

  try {
    // 1. Site Settings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      const settingsPath = path.join(dataDir, 'defaultSettings.json');
      if (fs.existsSync(settingsPath)) {
        const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        await SiteSettings.create(settingsData);
        console.log('Default Site Settings seeded into MongoDB.');
      }
    }

    // 2. Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin@spacesplaces123', salt);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        name: 'Spaces & Places Admin',
        role: 'admin'
      });
      console.log('Default admin created: admin / admin@spacesplaces123');
    }

    // 3. Pages
    const pageCount = await Page.countDocuments();
    if (pageCount === 0) {
      const pagesPath = path.join(dataDir, 'defaultPages.json');
      if (fs.existsSync(pagesPath)) {
        const pagesData = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
        await Page.insertMany(pagesData);
        console.log(`Seeded ${pagesData.length} pages into MongoDB.`);
      }
    }

    // 4. Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const blogsPath = path.join(dataDir, 'defaultBlogs.json');
      if (fs.existsSync(blogsPath)) {
        const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
        await Blog.insertMany(blogsData);
        console.log(`Seeded ${blogsData.length} blog articles into MongoDB.`);
      }
    }
  } catch (err) {
    console.error('Error during database seeding:', err.message);
  }
};
