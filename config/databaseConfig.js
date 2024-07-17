const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const url = process.env.DATABASE_URL;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(url);
  } catch (error) {
    console.error(error);
    throw { message: "Some error occured while connnecting to database." };
  }
};

const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    throw { message: "Some error occured while disconnnecting from database." };
  }
};

module.exports = { connectToDB, disconnectFromDB };
