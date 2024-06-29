import React, { useState } from "react";
import { Card, Pagination } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "../Searchbar";
import { StyledDiv } from "./styleComponents";

const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageContent, setPageContent] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [rating, setRating] = useState(5);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  const onPageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <StyledDiv>
      <div className="search">
        <SearchBar onSearchResultsUpdate={updateSearchResults} />
      </div>
      <div className="details">
        {searchResults &&
          searchResults
            .slice((pageNumber - 1) * pageContent, pageNumber * pageContent)
            .map((item) => (
              <Card
                key={item.id}
                title={item.name}
                extra={<Link to={`/details/${item.id}`}>More</Link>}
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <p>
                  <span className="label">Brewery Address: </span>
                  {item.address_1}
                </p>
                <p>
                  <span className="label">Phone No: </span>
                  {item.phone}
                </p>
                <p>
                  <span className="label">Website: </span>
                  <a href={item.website_url} target="_blank" rel="noopener noreferrer">
                    {item.website_url}
                  </a>
                </p>
                <p>
                  <span className="label">Current Rating: </span>
                  {rating}
                </p>
                <p>
                  <span className="label">State: </span>
                  {item.state}
                </p>
              </Card>
            ))}
      </div>
      <div className="page">
        <Pagination
          current={pageNumber}
          pageSize={pageContent}
          total={searchResults.length}
          onChange={onPageChange}
        />
      </div>
    </StyledDiv>
  );
};

export default HomePage;
