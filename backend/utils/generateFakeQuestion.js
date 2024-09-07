import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import Question from "../models/QuestionModal.js";

// Function to generate fake question data
const generateFakeQuestion = () => {
  return {
    title: faker.lorem.sentence(), // Title of the question
    options: [
      {
        text: faker.lorem.word(),
        imageUrl: getRandomImageUrl(),
        isCorrect: faker.datatype.boolean(), // Randomly set isCorrect
      },
      {
        text: faker.lorem.word(),
        imageUrl: getRandomImageUrl(),
        isCorrect: faker.datatype.boolean(), // Randomly set isCorrect
      },
      {
        text: faker.lorem.word(),
        imageUrl: getRandomImageUrl(),
        isCorrect: faker.datatype.boolean(), // Randomly set isCorrect
      },
      {
        text: faker.lorem.word(),
        imageUrl: getRandomImageUrl(),
        isCorrect: faker.datatype.boolean(), // Randomly set isCorrect
      },
    ],
    difficultyLevel: faker.helpers.arrayElement(["Easy", "Medium", "Hard"]), // Matches schema enum
    imageUrl: getRandomImageUrls(), // Array of image URLs
    solutionsUrl: getRandomSolutionsUrls(), // Array of solutions URLs
    likeCount: faker.number.int({ min: 0, max: 1000 }),
    dislikeCount: faker.number.int({ min: 0, max: 1000 }),
    subject: faker.lorem.word(),
    chapter: faker.lorem.word(),
    topics: faker.lorem.words(3).split(" "),
    acceptance: faker.number.int({ min: 0, max: 100 }), // Acceptance field
    questionType: faker.helpers.arrayElement([
      "Single Correct",
      "Multiple Correct",
      "Numerical",
      "Assertion Reason",
      "Matrix Match",
      "Integer",
    ]), // Matches schema enum
    markingScheme: faker.number.float({ min: 1, max: 10, precision: 0.1 }), // Random marking scheme
  };
};

// Function to create multiple fake questions in the database
export const createFakeQuestions = async (count = 10) => {
  try {
    const fakeQuestions = [];
    for (let i = 0; i < count; i++) {
      const fakeQuestion = generateFakeQuestion();
      fakeQuestions.push(new Question(fakeQuestion));
    }
    await Question.insertMany(fakeQuestions);
    console.log(`${count} fake questions created successfully.`);
  } catch (error) {
    console.error("Error creating fake questions:", error.message);
  }
};

// Helper function for generating a random image URL
const getRandomImageUrl = () =>
  `https://picsum.photos/seed/${uuidv4()}/200/300`;

// Helper function for generating multiple random image URLs
const getRandomImageUrls = () => [
  getRandomImageUrl(),
  getRandomImageUrl(),
  getRandomImageUrl(),
];

// Helper function for generating multiple random solutions URLs
const getRandomSolutionsUrls = () => [
  `https://example.com/solutions/${uuidv4()}`,
  `https://example.com/solutions/${uuidv4()}`,
];
