import React from "react";
import "./AppliedFilters.css";

const AppliedFilters = ({ filters, onRemoveFilter }) => {
  return (
    <div className="applied-filters">
      <div className="filters-list">
        {filters.subject && (
          <div className="filter-item">
            {filters.subject}
            <span
              className="remove-filter"
              onClick={() => onRemoveFilter("subject")}
            >
              &times;
            </span>
          </div>
        )}
        {filters.difficulty && (
          <div className="filter-item">
            {filters.difficulty}
            <span
              className="remove-filter"
              onClick={() => onRemoveFilter("difficulty")}
            >
              &times;
            </span>
          </div>
        )}
        {filters.chapter && (
          <div className="filter-item">
            {filters.chapter}
            <span
              className="remove-filter"
              onClick={() => onRemoveFilter("chapter")}
            >
              &times;
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedFilters;
