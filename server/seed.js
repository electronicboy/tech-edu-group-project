import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})


/**
 *
 * @param name {string}
 * @param img {string|null}
 */
async function addDestination(name, img) {
    // language=PostgreSQL
    await pool.query("INSERT INTO project_destinations (destination_name, destination_img) VALUES ($1, $2) ON CONFLICT DO NOTHING", [name, img]);
}

async function addComment(destination, name, message, review) {
    // language=PostgreSQL
    await pool.query("INSERT INTO project_comments (destination_id, comment_name, comment_message, comment_review) VALUES " +
        "((SELECT destination_id FROM project_destinations WHERE project_destinations.destination_name = $1), $2, $3, $4) ON CONFLICT DO NOTHING", [destination, name, message, review]);
}

async function truncate() {
    await pool.query("TRUNCATE project_destinations")
    await pool.query("TRUNCATE FROM project_comments")
}

//await truncate();

await addDestination("Spain", "https://imgproxy.natucate.com/wF8RACmH64YN4YV3BSgRXmhB7LtrW2eBW-xf6wRpJmQ/rs:fill/aHR0cHM6Ly93d3cubmF0dWNhdGUuY29tL21lZGlhL3BhZ2VzL3JlaXNlemllbGUvNDI4YTYzZWUtMmYzOS00YmFjLTgwY2UtNmY2N2Y4Yzc1NzJlL2MxNDJhZjc3MWUtMTY3OTQ4Njc1MC9zcGFuaWVuLWxhZW5kZXJpbmZvcm1hdGlvbmVuLXN0YWR0LW96ZWFuLXdhc3Nlci1uYXR1Y2F0ZS5qcGc")
await addDestination("France", "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg")
await addDestination("Germany", "https://www.abercrombiekent.co.uk/-/media/abercrombieandkent/images/page-header-images/europe/germany/germany__0001_germany-berlin-brandenburg-gate_shutterstock_367652915.jpg?la=en&hash=114B9999E63136AA1541ADFA5A86A741BEEF5527");
await addComment("spain", "John Smith", "Grate place!", 5);



// wait for pool to stop
pool.end()
