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
    await pool.query("INSERT INTO project_destinations (destination_name, destination_img) VALUES ($1, $2)", [name, img]);
}

async function addComment(destination, name, message, review) {
    await pool.query("INSERT INTO project_comments (destination_id, comment_name, comment_message, comment_review) VALUES " +
        "((SELECT destination_id FROM project_destinations WHERE project_destinations.destination_name = $1), $2, $3, $4)", [destination, name, message, review]);
}

await addDestination("spain")
await addComment("spain", "John Smith", "Grate place!", 5);



// wait for pool to stop
pool.end()
