const API = location.href.includes("localhost") ? "http://localhost:8081" : "https://travel-tech-ed-group-proj-server.onrender.com";


/**
 *
 * @returns {Promise<{id: number, name: string, img: string|null, review:number|null}[]>}
 */
async function getDestinations() {
    const response = await fetch(`${API}/destinations`)
    if (response.ok) {
        return await response.json();
    } else {
        return []; // Empty array = no destinations
    }
}

/**
 *
 * @returns {Promise<{id: number, name: string, img: string|null, review: number|null}|null>}
 */
async function getDestination(id) {
    const response = await fetch(`${API}/destinations/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}

/**
 *
 * @param destinationID {number} Number identifying the destination
 * @param reviewerName {string} Name of the reviewer
 * @param reviewerComment {string} Reviewers comment
 * @param reviewerRating {number} reviewer rating
 * @returns {Promise<Response>}
 */
async function sendReview(destinationID, reviewerName, reviewerComment, reviewerRating) {
    return await fetch(`${API}/reviews/${destinationID}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment_name: reviewerName,
            comment_message: reviewerComment,
        comment_review: reviewerRating
        })
    });
}

/**
 *
 * @param id {number}
 * @returns {Promise<void>}
 */
async function getReviews(id) {
    const response = await fetch(`${API}/reviews/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        return []; // empty for error (for now?)
    }
}

export {getDestinations, getDestination, sendReview, getReviews};

