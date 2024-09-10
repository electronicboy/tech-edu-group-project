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
  const destinationId = 11
  const response = await fetch(`http://0.0.0.0:8081/reviews/${destinationId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  console.log("From the server:", responseData);

  reviewForm.reset();
  getReviews();
}

reviewForm.addEventListener("submit", handleSubmit);

// Add a container to display the submitted reviews
const reviewsContainer = document.getElementById("reviewsContainer");

async function getReviews() {
  const response = await fetch("http://0.0.0.0:8081/reviews/:id"); // Adjust the endpoint as needed
  const reviews = await response.json();

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

getReviews();