const API = location.href.includes("localhost") ? "http://localhost:8081" : "https://travel-tech-ed-group-proj-server.onrender.com";


/**
 *
 * @returns {Promise<{id: number, name: string, img: string|null}[]>}
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
 * @returns {Promise<{id: number, name: string, img: string|null}|null>}
 */
async function getDestination(id) {
    const response = await(fetch(`${API}/destinations/${id}`));
    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}


/**
 *
 * @param id {number}
 * @returns {Promise<void>}
 */
async function getReviews(id) {
    const response = await fetch(`${API}/reviews/${id}`);
    return await response.json();
}

export {getDestinations, getDestination, getReviews};
