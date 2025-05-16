const sequelize = require('./index');
const models = require('../../models');
const { exec } = require('child_process');

async function syncDatabase() {
  try {
    // Run migrations
    console.log('Running migrations...');
    exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Migration stderr: ${stderr}`);
        return;
      }
      console.log(`Migration stdout: ${stdout}`);
      
      // After migrations, sync any remaining models
      sequelize.sync({ alter: true })
        .then(() => {
          console.log('Database synchronized successfully');
          process.exit(0);
        })
        .catch((syncError) => {
          console.error('Error synchronizing database:', syncError);
          process.exit(1);
        });
    });
  } catch (error) {
    console.error('Error in database sync process:', error);
    process.exit(1);
  }
}

syncDatabase();