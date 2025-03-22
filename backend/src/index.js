import connectDB from "./db/index.js";
import {httpServer} from './app.js'

const majorNodeVersion = +process.env.NODE_VERSION?.split('.')[0] || 0;
const port = process.env.PORT || 8000

const startServer = () => {
  httpServer.listen(port, () => {
    console.info(
      `📑 Visit the documentation at: http://localhost:${
        port
      }`
    );
    console.log("Server is running on port: " + port);
  });
};

if (majorNodeVersion >= 20) {
  try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("Mongo db connect error: ", err);
  }
} else {
  connectDB()
    .then(() => {
      startServer();
    })
    .catch((err) => {
      console.log("Mongo db connect error: ", err);
    });
}