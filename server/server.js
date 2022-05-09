import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Enable CORS
app.use(cors());

// Parse requests of content-type -application/json
app.use(express.json());

// Parse requests of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.resolve("~/www/photoshare/")));

// Add the routes in postRoutes to the app
app.use("/api/posts", postRoutes);

// Set the port and listen for requests
const PORT = process.env.PORT ?? 8000;

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit(1);
  });
