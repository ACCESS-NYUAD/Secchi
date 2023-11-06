const server = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 443;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var expressServer;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, dbOptions)
  .then((res) => {
    console.log("Connected to database");
    expressServer = server.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

async function handleShutdownGracefully() {
  console.info("Closing Server gracefully...");
  await expressServer.close(() => {
    console.info("Server Closed.");
  });
  await mongoose.connection.close();
  process.exit(0);
}

// process.on("SIGINT", handleShutdownGracefully);
// process.on("SIGTERM", handleShutdownGracefully);
// process.on("SIGHUP", handleShutdownGracefully);
