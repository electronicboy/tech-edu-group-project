import {getDestinations} from "./client";

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

  reviewForm = document.getElementById("reviewForm");
// handleSubmit code...
});


const destinations = await getDestinations();
for (let destination of destinations) {
console.log("dest", destination);
}
