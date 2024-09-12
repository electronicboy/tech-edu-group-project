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
    comment_likes INT DEFAULT 0,
    FOREIGN KEY (destination_id) REFERENCES project_destinations(destination_id)
);

-- ALTER TABLE project_comments ADD COLUMN comment_likes INT DEFAULT 0;

-- DELETE FROM project_comments WHERE comment_id = ?;

-- UPDATE project_comments SET comment_likes = comment_likes + 1 WHERE comment_id = ?;
