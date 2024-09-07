import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      text: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: false,
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  imageUrl: [String], // Array of image URLs
  solutionsUrl: [String], // Array of URLs
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  subject: {
    type: String,
    required: false,
  },
  chapter: {
    type: String,
    required: false,
  },
  topics: [String],
  acceptance: {
    type: Number,
    required: false, // Set to true if mandatory
  },
  questionType: {
    type: String,
    enum: [
      "Single Correct",
      "Multiple Correct",
      "Numerical",
      "Assertion Reason",
      "Matrix Match",
      "Integer",
    ],
    required: true,
  },
  markingScheme: {
    type: Number,
    required: true, // Set to false if not mandatory
  },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
