import styled from "styled-components";

export const StyledDiv = styled.div`
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