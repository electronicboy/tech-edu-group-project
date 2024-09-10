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

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})


app.listen(port, () => {
    console.log(`Server is now listening on http://0.0.0.0:${port}`)
})


