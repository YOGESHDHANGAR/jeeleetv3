// api/questions.js
import apiClient from "./api";

export const fetchQuestions = async ({
  page,
  limit,
  debouncedGlobalFilter = "",
  subject = "",
  difficulty = "",
  chapter = "",
}) => {
  // Create the URL for the GET request with the base URL and endpoint
  const fetchURL = new URL("/api/questions", apiClient.defaults.baseURL);

  // Append pagination parameters
  fetchURL.searchParams.append("page", page);
  fetchURL.searchParams.append("limit", limit);

  // Append optional filters if they are provided
  if (debouncedGlobalFilter) {
    fetchURL.searchParams.append(
      "debouncedGlobalFilter",
      debouncedGlobalFilter
    );
  }
  if (subject) {
    fetchURL.searchParams.append("subject", subject);
  }
  if (difficulty) {
    fetchURL.searchParams.append("difficulty", difficulty);
  }
  if (chapter) {
    fetchURL.searchParams.append("chapter", chapter);
  }

  try {
    // Perform the GET request using the constructed URL
    const response = await apiClient.get(fetchURL.toString());
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

// Function to fetch a single question by ID with optional filters
export const fetchQuestionById = async ({
  id,
  subject = "",
  difficulty = "",
  chapter = "",
}) => {
  // Create the URL for the GET request to fetch a question by ID
  const fetchURL = new URL(`/api/questions/${id}`, apiClient.defaults.baseURL);

  if (subject) {
    fetchURL.searchParams.append("subject", subject);
  }
  if (difficulty) {
    fetchURL.searchParams.append("difficulty", difficulty);
  }
  if (chapter) {
    fetchURL.searchParams.append("chapter", chapter);
  }

  try {
    // Perform the GET request using the constructed URL
    const response = await apiClient.get(fetchURL.toString());
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
