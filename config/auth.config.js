module.exports = {
  secret: process.env.JWT_SECRET || "sirams_x_secret_key",
  expiresIn: process.env.JWT_EXPIRES_IN || 86400 // 24 hours
};