import React from "react";
import "./SearchComponent.css"; // Import the CSS file for styling

const SearchComponent = ({ placeholder, icon, value, onChange }) => {
  return (
    <div className="search-container">
      {icon && <img src={icon} alt="Search Icon" className="search-icon" />}
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Search..."}
        value={value} // Controlled component
        onChange={onChange} // Handle input changes
      />
    </div>
  );
};

export default SearchComponent;
