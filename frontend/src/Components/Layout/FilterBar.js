import React from "react";
import "./FilterBar.css";
import Dropdown from "./Dropdown";
import SearchComponent from "./SearchComponent";

const subjectOptions = ["Physics", "Chemistry", "Mathematics"];
const difficultyOptions = ["Easy", "Medium", "Hard"];
const chapterOptions = [
  "Physics and Measurement",
  "Kinematics",
  "Gravitation",
  "Power",
  "Laws of Motion",
  "Oscillations",
  "Current Electricity",
  "Communication Systems",
  "Magnetism",
  "Magnetic Effects of Current",
  "Dual Nature of Matter",
  "Atoms",
  "Optics",
  "Thermodynamics",
  "Rotational Motion",
  "Work and Energy",
  "Properties of Solids and Liquids",
  "Electronic Devices",
  "Waves",
  "Electromagnetic Waves",
  "Electromagnetic Induction",
  "Alternating Currents",
  "Kinetic Theory of Gases",
  "Radiation",
  "Nuclei",
  "Electrostatics",
];
const displayPageCountOptions = ["20/page", "50/page", "100/page"];

const FilterBar = ({
  searchTerm,
  onSearch,
  onFilterChange,
  onPageSizeChange,
  filters,
  pageSize, // Add pageSize as a separate prop
}) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    onSearch(e.target.value);
  };

  const handleDropdownChange = (type, value) => {
    onFilterChange(type, value);
  };

  const handlePageSizeChange = (value) => {
    const numberOfItems = parseInt(value.split("/")[0], 10);
    onPageSizeChange(numberOfItems);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <Dropdown
          options={subjectOptions}
          placeholderText="Subject"
          onChange={(value) => handleDropdownChange("subject", value)}
          selectedFilter={filters.subject} // Pass the selected filter
        />
        <Dropdown
          options={difficultyOptions}
          placeholderText="Difficulty"
          onChange={(value) => handleDropdownChange("difficulty", value)}
          selectedFilter={filters.difficulty} // Pass the selected filter
        />
        <Dropdown
          options={chapterOptions}
          placeholderText="Chapter"
          onChange={(value) => handleDropdownChange("chapter", value)}
          selectedFilter={filters.chapter} // Pass the selected filter
        />
        <SearchComponent
          placeholder="Search questions"
          icon="/search.png"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Dropdown
        options={displayPageCountOptions}
        placeholderText="Pages"
        onChange={handlePageSizeChange}
        selectedFilter={`${pageSize}/page`} // Ensure the selected page size is passed
      />
    </div>
  );
};

export default FilterBar;
