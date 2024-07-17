const { connectToDB, disconnectFromDB } = require("./databaseConfig");
const { paginationConfig } = require("./paginationConfig");

module.exports = {
  paginationConfig,
  connectToDB,
  disconnectFromDB,
};
