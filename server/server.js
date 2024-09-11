import cors from "cors";
import dotenv from "dotenv";
import express, { request, response } from "express";
import pg from "pg";

dotenv.config();
const port = process.env.PORT || 8080;

// Setup express and middleware
const app = express();
app.use(cors());
app.use(express.json());

/** @type {Client} */
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})

app.get("/destinations", async (request, response) => {
    const results = await pool.query("SELECT destination_id, destination_name, destination_img FROM project_destinations")
    if (results.rowCount > 0) {
        const filtered = results.rows.map((entry) => {
            return {
                id: entry.destination_id, name: entry.destination_name, img: entry.destination_img
            }
        })
        response.json(filtered);
    } else {
        response.status(404).end();
    }
})

app.get("/reviews/:id", async (request, response) => {
    const reviews = await pool.query("SELECT * FROM project_comments WHERE destination_id = $1", [request.params.id]);
    response.json(reviews.rows)
    console.log(reviews.rows)
})

app.post("/reviews/:id", async (request, response) => {
const {
    comment_name,
    comment_message,
    comment_review
} = request.body;

   const reviews = await pool.query(`INSERT INTO project_comments(
    destination_id,
    comment_name,
    comment_message,
    comment_review) VALUES($1,$2,$3,$4)RETURNING *`, [
        request.params.id,
        comment_name,
        comment_message,
        comment_review]);
    response.json(reviews.rows)
})


app.listen(port, () => {
    console.log(`Server is now listening on http://0.0.0.0:${port}`)
})


