import React from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css"; // Ensure this CSS file includes necessary styles

const Table = ({ questions }) => {
  const navigate = useNavigate();

  const handleRowClick = (questionId) => {
    navigate(`/questions/${questionId}`); // Navigate to the question detail page
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent the row click event from firing
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <div>ID</div>
        <div>Title</div>
        <div>Solutions</div>
        <div>Acceptance</div>
        <div>Difficulty</div>
      </div>
      {questions.map((row) => (
        <div
          key={row._id}
          className="table-row clickable_row"
          onClick={() => handleRowClick(row._id)}
        >
          <div className="table-cell">{row._id}</div>
          <div
            className="table-cell title"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the row click event when clicking on the title
              handleRowClick(row._id);
            }}
          >
            {row.title}
          </div>
          <div className="table-cell">
            {row.solutionsUrl && row.solutionsUrl.length > 0 ? (
              <div className="solutions-dropdown">
                <select
                  onClick={handleDropdownClick}
                  defaultValue={row.solutionsUrl[0]}
                >
                  {row.solutionsUrl.map((url, index) => (
                    <option key={index} value={url}>
                      Solution {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <span>No Solutions</span>
            )}
          </div>
          <div className="table-cell">{row.acceptance || "N/A"}</div>
          <div
            className={`table-cell difficulty ${row.difficultyLevel.toLowerCase()}`}
          >
            {row.difficultyLevel}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Table);
