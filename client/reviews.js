import {getReviews, sendReview} from "./apiClient"

const urlParams = new URLSearchParams(window.location.search);
const destinationParam = urlParams.get('destination');
if (destinationParam == null) {
  // TODO: We don't have a target?!
}

/** @type {number} */
const destinationID = JSON.parse(destinationParam);

//toggle form animation
document.addEventListener("DOMContentLoaded", function () {
  const toggleFormButton = document.getElementById("toggle-form");
  const formContent = document.getElementById("form-content");

  toggleFormButton.addEventListener("click", function () {
    if (formContent.style.display === "block") {
      formContent.style.display = "none";
    } else {
      formContent.style.display = "block";
    }
  });
});

// handleSubmit code...
const reviewForm = document.getElementById("reviewForm");

async function handleSubmit(event) {

  event.preventDefault();

  const formData = new FormData(reviewForm);
  const data = Object.fromEntries(formData);
  console.log(data);
  const response = await sendReview(destinationID, data.comment_name, data.comment_message, data.comment_review)
  const responseData = await response.json()

  console.log("From the server:", responseData);

  reviewForm.reset();
  populateReviews()
}

reviewForm.addEventListener("submit", handleSubmit);


const reviewsContainer = document.getElementById("reviewsContainer");

async function populateReviews() {

  const reviews = await getReviews(destinationID)



  reviewsContainer.innerHTML = ""; // Clear the existing reviews

  // Iterate over each review and append it to the container
  reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.className = "previous-reviews";
    reviewElement.innerHTML = `
      <p><strong>${review.comment_name}</strong></p>
      <p>${review.comment_message}</p>
      <p>Rating: ${review.comment_review}/5</p>
      <p>Date: ${new Date(review.comment_date).toLocaleString()}</p>
    `;
    reviewsContainer.appendChild(reviewElement);
  });
}

populateReviews();
