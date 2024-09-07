import React, { useState } from "react";
import "./InfoCard.css";

const InfoCard = ({ question }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={`info_card ${isOpen ? "open" : "closed"}`}>
      {/* Top Bar */}
      <div className="info_card_top">
        <button className="toggle_button" onClick={handleToggle}>
          {isOpen ? "◀" : "▶"} {/* Left/Right arrow icon */}
        </button>
        <div className={`like_dislike ${isOpen ? "show" : "hide"}`}>
          <button className="like_button">👍 {question?.likeCount}</button>
          <button className="dislike_button">
            👎 {question?.dislikeCount}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className={`info_card_content ${isOpen ? "show" : "hide"}`}>
        <h2>Question Details</h2>
        <p>
          <strong>Title:</strong> {question?.title}
        </p>
        <p>
          <strong>Difficulty:</strong>{" "}
          <span
            className={`difficulty-${question?.difficultyLevel.toLowerCase()}`}
          >
            {question?.difficultyLevel}
          </span>
        </p>
        <p>
          <strong>Subject:</strong> {question?.subject}
        </p>
        <p>
          <strong>Chapter:</strong> {question?.chapter}
        </p>
        <p>
          <strong>Topics:</strong> {question?.topics.join(", ")}
        </p>
        <p>
          <strong>Acceptance:</strong> {question?.acceptance}
        </p>
      </div>

      {/* Bottom Section */}
      <div className={`info_card_bottom ${isOpen ? "show" : "hide"}`}>
        <div className="feedback_icon">🗨️</div>
      </div>
    </div>
  );
};

export default React.memo(InfoCard);
