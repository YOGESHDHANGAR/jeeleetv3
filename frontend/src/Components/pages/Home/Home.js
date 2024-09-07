import React, { useEffect, Suspense, lazy } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useForm } from "react-hook-form";
import "./Home.css";
import FilterBar from "../../Layout/FilterBar";
import Pagination from "../../Layout/Pagination";
import { fetchQuestions } from "../../../api/questions";
import AppliedFilters from "../../Layout/AppliedFilters";

// Lazy load the Table component
const Table = lazy(() => import("../../Layout/Table"));

const Home = () => {
  const { register, watch, setValue } = useForm({
    defaultValues: {
      searchTerm: "",
      pageSize: parseInt(localStorage.getItem("pageSize")) || 20,
      filters: JSON.parse(localStorage.getItem("filters")) || {
        subject: "",
        difficulty: "",
        chapter: "",
      },
    },
  });

  const currentPage = watch("currentPage", 1);
  const searchTerm = watch("searchTerm");
  const pageSize = watch("pageSize");
  const filters = watch("filters");

  const [debouncedGlobalFilter] = useDebounce(searchTerm, 800);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "questions",
      currentPage,
      pageSize,
      debouncedGlobalFilter,
      filters,
    ],
    queryFn: () =>
      fetchQuestions({
        page: currentPage,
        limit: pageSize,
        debouncedGlobalFilter: debouncedGlobalFilter,
        ...filters,
      }),
    placeholderData: keepPreviousData,
    onSuccess: () => {
      // Handle any side-effects or post-fetch logic here
    },
  });

  const questions = data?.questions;
  const totalItems = data?.totalItems || 0;

  useEffect(() => {
    // Load filters and page size from local storage when the component mounts
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      setValue("filters", JSON.parse(savedFilters));
    }
  }, [setValue]);

  useEffect(() => {
    // Save filters to local storage whenever they change
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    // Save page size to local storage whenever it changes
    localStorage.setItem("pageSize", pageSize);
  }, [pageSize]);

  const handlePageChange = (page) => {
    setValue("currentPage", page);
    refetch();
  };

  const handleSearch = (term) => {
    setValue("searchTerm", term);
    setValue("currentPage", 1); // Reset to the first page on search
    refetch();
  };

  const handlePageSizeChange = (size) => {
    setValue("pageSize", size);
    setValue("currentPage", 1); // Reset to the first page when page size changes
    refetch();
  };

  const handleFilterChange = (type, value) => {
    setValue(`filters.${type}`, value);
    setValue("currentPage", 1); // Reset to the first page when filters change
    refetch();
  };

  const handleRemoveFilter = (type) => {
    setValue(`filters.${type}`, "");
    setValue("currentPage", 1); // Reset to the first page when filters change
    refetch();
  };

  return (
    <div className="home_main">
      <FilterBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onPageSizeChange={handlePageSizeChange}
        filters={filters} // Pass the filters state to the FilterBar
        pageSize={pageSize}
      />

      <AppliedFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
      {isLoading ? (
        <div className="table_loading">Loading...</div>
      ) : error ? (
        <div className="table_error">Error: {error.message}</div>
      ) : (
        <Suspense
          fallback={<div className="table_loading">Loading table...</div>}
        >
          <Table questions={questions} />
        </Suspense>
      )}

      <Pagination
        totalItems={totalItems}
        itemsPerPage={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default React.memo(Home);
