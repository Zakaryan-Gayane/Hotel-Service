import app from "./app";
import dotenv from "dotenv";
import { connect as mongoConnect } from "./db/mongo";
import { socketAuth } from "./middlewares/auth.middleware";
import socketManager from "./socket/socketManager";

dotenv.config();
// const port = process.env.PORT || 3001;
const port: number = parseInt(process.env.PORT, 10) || 3001;

const hostname = '0.0.0.0';
// app.httpServer.listen(port);
app.httpServer.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
mongoConnect();

app.httpServer.on("listening", () => {
  console.log(`server is listening on ${port}`);
});

app.io.use(socketAuth);
socketManager.initializeSocketIO(app.io);

app.httpServer.on("error", (error: any) => {
  switch (error.code) {
    case "EACCES":
      console.error(port + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(port + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
});

export default app.express;