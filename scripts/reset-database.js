require('dotenv').config();
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function resetDatabase() {
  try {
    console.log('Menghapus semua migrasi...');
    await execPromise('npx sequelize-cli db:migrate:undo:all');
    
    console.log('Menjalankan migrasi ulang...');
    await execPromise('npx sequelize-cli db:migrate');
    
    console.log('Menjalankan seeder...');
    await execPromise('npx sequelize-cli db:seed:all');
    
    console.log('Database berhasil direset dan dimigrasi ulang!');
  } catch (error) {
    console.error('Error saat mereset database:', error);
  }
}

resetDatabase();