import cors from "cors";
import dotenv from "dotenv";
import express from "express";
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

app.get("/destinations", (request, response) => {
    /** @type {Result} */
    pool.query("SELECT destination_id, destination_name, destination_img FROM project_destinations").then(results => {
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
})


app.listen(port, () => {
    console.log(`Server is now listening on http://0.0.0.0:${port}`)
})


