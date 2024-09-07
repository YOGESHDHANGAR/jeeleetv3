import React, { useState } from "react";
import "./QuestionCard.css";

const QuestionCard = ({ question, onNext, onPrev }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalStyle, setModalStyle] = useState({});

  const handleOptionClick = (index) => {
    setSelectedOption((prevSelected) =>
      prevSelected === index ? null : index
    );
  };

  const handleImageClick = (url) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const scaleWidth = viewportWidth / imgWidth;
      const scaleHeight = viewportHeight / imgHeight;
      const scale = Math.min(scaleWidth, scaleHeight, 2);

      setModalStyle({
        width: imgWidth * scale + "px",
        height: imgHeight * scale + "px",
      });
      setModalImage(url);
    };
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      console.log(`Selected option: ${question?.options[selectedOption].text}`);
    } else {
      console.log("No option selected");
    }
  };

  return (
    <div className="question_card">
      <div className="question_card_top">
        {/* Timer controls and fullscreen logic goes here */}
      </div>
      <div className="question_content">
        <div className="question_title">
          Que. : {question.title || "Description not available."}
        </div>
        {question.imageUrl && (
          <div className="question_images_container">
            {question.imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Question ${index}`}
                onClick={() => handleImageClick(url)}
                className="thumbnail_image"
              />
            ))}
          </div>
        )}
        <div className="question_options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedOption === index ? "selected" : ""}`}
              onClick={() => handleOptionClick(index)}
            >
              <span className="option_label">({getOptionLabel(index)})</span>
              <span className="option_text">{option.text}</span>
              {option.imageUrl && (
                <img
                  src={option.imageUrl}
                  alt={`Option ${index}`}
                  onClick={() => handleImageClick(option.imageUrl)}
                  className="thumbnail_image"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="question_card_bottom">
        {selectedOption !== null && (
          <div className="submit_selected_option_button">
            <button className="submit_button" onClick={handleSubmit}>
              Submit
            </button>
            <span className="selected_option_label">
              Selected Option: ({getOptionLabel(selectedOption)})
            </span>
          </div>
        )}
        <div className="next_prev_buttons">
          <button className="prev_button" onClick={onPrev}>
            ◀ Prev
          </button>
          <button className="next_button" onClick={onNext}>
            Next ▶
          </button>
        </div>
      </div>

      {modalImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div
            className="modal_content"
            onClick={(e) => e.stopPropagation()}
            style={modalStyle}
          >
            <span className="close_button" onClick={handleCloseModal}>
              ×
            </span>
            <img src={modalImage} alt="Large view" className="modal_image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(QuestionCard);
