import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarReview from "../StarReview";
import { FaStar } from "react-icons/fa";
import "./index.css";

const PageDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        setDetails(response.data);

        const reviewsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reviews/${id}`
        );
        console.log(reviewsResponse);
        setReviews(reviewsResponse.data.reviews);
        setOverallRating(reviewsResponse.data.overallRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleReviewSubmit = async () => {
    setReviews([...reviews, { review: newReview, rated: rating, owner: "You" }]);
    const token = `bearer ${localStorage.getItem("token")}`;
    console.log(rating);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
        newReview,
        rating,
        id: details.id,
        token,
      })
      .then((res) => {
        console.log("success on review");
      })
      .catch((err) => {
        console.log("error in HandleReviewSubmit");
      });
    setNewReview("");
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="details-container">
      <div className="details-left">
        <h2>{details.name}</h2>
        <p>
          <span style={{ fontWeight: "600" }}>Current Rating: </span>
          {overallRating}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Brewery Address: </span>
          {details.address_1}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Brewery Type: </span>
          {details.brewery_type}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Phone No: </span>
          {details.phone}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>City: </span>
          {details.city}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>State Province: </span>
          {details.state_province}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>State: </span>
          {details.state}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Postal Code: </span>
          {details.postal_code}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Country: </span>
          {details.country}
        </p>
        <p>
          <span style={{ fontWeight: "600" }}>Website: </span>
          {details.website_url}
        </p>
      </div>
      <div className="details-right">
        <h3>Reviews</h3>
        <div className="review-container">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <div className="review-owner">{review.owner}</div>
              <div className="review-text">{review.review}</div>
              <div className="review-rating">
                {review.rated}
                <FaStar size={16} color="#FFD700" />
              </div>
            </div>
          ))}
        </div>
        <StarReview onRate={handleRating} />
        <br />
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Add your review..."
          style={{ width: "100%", height: "60px" }}
        />
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default PageDetails;
