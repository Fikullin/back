module.exports = {
  HOST: process.env.DB_HOST || "127.0.0.1",
  USER: process.env.DB_USERNAME || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "your_password",
  DB: process.env.DB_DATABASE || "sirams_db",
  PORT: process.env.DB_PORT || 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};