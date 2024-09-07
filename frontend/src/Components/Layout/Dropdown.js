import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

const Dropdown = ({ options, placeholderText, onChange, selectedFilter }) => {
  // Initialize selectedOption with selectedFilter, ensuring the tick is shown initially
  const [selectedOption, setSelectedOption] = useState(selectedFilter || null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    const newSelectedOption = option === selectedOption ? null : option;
    setSelectedOption(newSelectedOption);
    setIsOpen(false);
    if (onChange) onChange(newSelectedOption);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ensure that the selected option updates when the parent component updates the selectedFilter prop
  useEffect(() => {
    setSelectedOption(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption || placeholderText}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {selectedOption === option && <span className="tick">✔</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
