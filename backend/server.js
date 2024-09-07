import dotenv from "dotenv";
import app from "./app.js"; // Adjust if necessary
import { createFakeQuestions } from "./utils/generateFakeQuestion.js";

// Load environment variables from .env file
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

// createFakeQuestions(100);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
