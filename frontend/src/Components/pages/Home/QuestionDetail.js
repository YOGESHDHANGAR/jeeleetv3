import React from "react";
import "./QuestionDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestionById } from "../../../api/questions";
import InfoCard from "./InfoCard";
import QuestionCard from "./QuestionCard";

// Function to retrieve filters from local storage
const getSavedFilters = () => {
  const savedFilters = localStorage.getItem("filters");
  return savedFilters
    ? JSON.parse(savedFilters)
    : {
        subject: "",
        difficulty: "",
        chapter: "",
      };
};

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieve filters from local storage
  const filters = getSavedFilters();

  const {
    data: question,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["question", id, filters],
    queryFn: () => fetchQuestionById({ id, ...filters }), // Pass the current filters here
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleNext = () => {
    if (question.nextId) {
      navigate(`/questions/${question.nextId}`);
    }
  };

  const handlePrev = () => {
    if (question.prevId) {
      navigate(`/questions/${question.prevId}`);
    }
  };

  return (
    <div className="question_detail_container">
      <InfoCard question={question.question} />
      <QuestionCard
        question={question.question}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default React.memo(QuestionDetail);
