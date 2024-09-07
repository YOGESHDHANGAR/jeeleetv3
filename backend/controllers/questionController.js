import Question from "../models/QuestionModal.js";

// @desc    Create a new question
// @route   POST /api/questions
// @access  Public
export const createQuestion = async (req, res) => {
  try {
    const {
      title,
      options,
      correctAnswer,
      difficultyLevel,
      imageUrl = [], // Default to empty array
      solutionsUrl = [], // Default to empty array
      likeCount = 0,
      dislikeCount = 0,
      subject,
      chapter,
      topics = [],
      acceptance = 0, // Default value if not provided
    } = req.body;

    const newQuestion = new Question({
      title,
      options,
      correctAnswer,
      difficultyLevel,
      imageUrl,
      solutionsUrl,
      likeCount,
      dislikeCount,
      subject,
      chapter,
      topics,
      acceptance,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create question", error: error.message });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Public
export const updateQuestion = async (req, res) => {
  try {
    const {
      title,
      options,
      correctAnswer,
      difficultyLevel,
      imageUrl,
      solutionsUrl,
      likeCount,
      dislikeCount,
      subject,
      chapter,
      topics,
      acceptance,
    } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.title = title ?? question.title;
    question.options = options ?? question.options;
    question.correctAnswer = correctAnswer ?? question.correctAnswer;
    question.difficultyLevel = difficultyLevel ?? question.difficultyLevel;
    question.imageUrl = imageUrl ?? question.imageUrl;
    question.solutionsUrl = solutionsUrl ?? question.solutionsUrl;
    question.likeCount = likeCount ?? question.likeCount;
    question.dislikeCount = dislikeCount ?? question.dislikeCount;
    question.subject = subject ?? question.subject;
    question.chapter = chapter ?? question.chapter;
    question.topics = topics ?? question.topics;
    question.acceptance = acceptance ?? question.acceptance;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update question", error: error.message });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Public
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.remove();
    res.json({ message: "Question removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete question", error: error.message });
  }
};

// @desc    Get all questions with pagination and search
// @route   GET /api/questions
// @access  Public
export const getAllQuestions = async (req, res) => {
  try {
    // Extract pagination and filter parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const debouncedGlobalFilter = req.query.debouncedGlobalFilter || "";
    const subjectFilter = req.query.subject || "";
    const difficultyFilter = req.query.difficulty || "";
    const chapterFilter = req.query.chapter || "";

    // Validate parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    // Calculate skip and limit values
    const skip = (page - 1) * limit;

    // Create search query with regex for multiple fields and filters
    const query = {
      ...(debouncedGlobalFilter && {
        $or: [
          { title: { $regex: debouncedGlobalFilter, $options: "i" } },
          { subject: { $regex: debouncedGlobalFilter, $options: "i" } },
          { chapter: { $regex: debouncedGlobalFilter, $options: "i" } },
          {
            topics: {
              $elemMatch: { $regex: debouncedGlobalFilter, $options: "i" },
            },
          },
        ],
      }),
      ...(subjectFilter && { subject: subjectFilter }),
      ...(difficultyFilter && { difficultyLevel: difficultyFilter }),
      ...(chapterFilter && { chapter: chapterFilter }),
    };

    // Fetch total number of questions
    const totalQuestions = await Question.countDocuments(query);

    // Fetch paginated questions with only the required fields
    const questions = await Question.find(query)
      .select("_id title difficultyLevel acceptance solutionsUrl")
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({ questions, totalItems: totalQuestions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch questions", error: error.message });
  }
};

// @desc    Get a single question with next and previous question IDs
// @route   GET /api/questions/:id
// @access  Public
export const getSingleQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, difficulty, chapter } = req.query;

    // Find the current question
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Build query filters
    const filters = {
      ...(subject && { subject }),
      ...(difficulty && { difficultyLevel: difficulty }),
      ...(chapter && { chapter }),
    };

    // Find the next question
    const nextQuestion = await Question.findOne({
      _id: { $gt: id },
      ...filters,
    }).sort({ _id: 1 });

    // Find the previous question
    const prevQuestion = await Question.findOne({
      _id: { $lt: id },
      ...filters,
    }).sort({ _id: -1 });

    res.json({
      question,
      nextId: nextQuestion?._id || null,
      prevId: prevQuestion?._id || null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch question", error: error.message });
  }
};
