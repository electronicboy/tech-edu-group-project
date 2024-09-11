import {getDestinations} from "./apiClient";

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

async function populate() {

    const imageContainer = document.getElementById("imageContainer")

    const destinations = await getDestinations();
    for (let destination of destinations) {
        console.log("dest", destination);
        const container = document.createElement("div");
        container.addEventListener("click", function () {
            location.href = `/destination.html?destination=${destination.id}`;
        })
        container.classList.add("box")
        const boxFooter = document.createElement("div");
        boxFooter.classList.add("box-footer");
        container.appendChild(boxFooter);

        const nameHolder = document.createElement('div')
        nameHolder.textContent = destination.name;
        nameHolder.classList.add("nameHolder")
        boxFooter.appendChild(nameHolder);
        const reviewHolder = document.createElement('div')
        reviewHolder.textContent = destination.review ? destination.review.toFixed(1) + " out of 5": "??"
        reviewHolder.classList.add("reviewHolder")
        boxFooter.appendChild(reviewHolder);


        container.style.backgroundImage = `url('${destination.img}')`;
        imageContainer.appendChild(container);
    }
}

populate()
