CREATE TABLE IF NOT EXISTS project_destinations(
    destination_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    destination_name VARCHAR(120) NOT NULL,
    destination_img VARCHAR(320)
);

CREATE TABLE IF NOT EXISTS project_comments (
    comment_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    destination_id INT,
    comment_name VARCHAR(320) NOT NULL,
    comment_date TIMESTAMP DEFAULT now(),
    comment_message TEXT,
    comment_review INT,
    FOREIGN KEY (destination_id) REFERENCES project_destinations(destination_id)
);