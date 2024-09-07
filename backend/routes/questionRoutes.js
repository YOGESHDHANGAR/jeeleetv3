import express from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getSingleQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/create", createQuestion);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getSingleQuestion);

export default router;
