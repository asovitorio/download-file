
 module.exports = {
  dialect: 'sqlite',
  storage: './src/api/database/db_file.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
 }