import React, { useState } from "react";
import styled from "styled-components";
import { Card, Pagination } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "../Searchbar";

const Homepage = () => {
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

export default Homepage;

const StyledDiv = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .search {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .details {
    display: grid;
    gap: 25px 10px;
    padding: 20px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ff2e63;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #d92e63;
    }
  }

  .page {
    display: flex;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  }

  .label {
    font-weight: 600;
  }
`;
