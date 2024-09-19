import express from "express";
import { ConnectDB } from "./db/ConnectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // for parsing incoming req.body
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  ConnectDB();
  console.log("Server started on port 3000");
});
