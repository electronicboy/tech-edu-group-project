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
    // language=PostgreSQL
    await pool.query("INSERT INTO project_comments (destination_id, comment_name, comment_message, comment_review) VALUES " +
        "((SELECT destination_id FROM project_destinations WHERE project_destinations.destination_name = $1), $2, $3, $4) ON CONFLICT DO NOTHING", [destination, name, message, review]);
}

async function truncate() {
    await pool.query("DELETE FROM project_comments")
    await pool.query("DELETE FROM project_destinations")
}

//await truncate();

await addDestination("Spain", "https://imgproxy.natucate.com/wF8RACmH64YN4YV3BSgRXmhB7LtrW2eBW-xf6wRpJmQ/rs:fill/aHR0cHM6Ly93d3cubmF0dWNhdGUuY29tL21lZGlhL3BhZ2VzL3JlaXNlemllbGUvNDI4YTYzZWUtMmYzOS00YmFjLTgwY2UtNmY2N2Y4Yzc1NzJlL2MxNDJhZjc3MWUtMTY3OTQ4Njc1MC9zcGFuaWVuLWxhZW5kZXJpbmZvcm1hdGlvbmVuLXN0YWR0LW96ZWFuLXdhc3Nlci1uYXR1Y2F0ZS5qcGc")
await addDestination("France", "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg")
await addDestination("Germany", "https://www.abercrombiekent.co.uk/-/media/abercrombieandkent/images/page-header-images/europe/germany/germany__0001_germany-berlin-brandenburg-gate_shutterstock_367652915.jpg?la=en&hash=114B9999E63136AA1541ADFA5A86A741BEEF5527");

await addDestination("Switzerland", "https://www.blueroadstouring.com/sites/default/files/styles/gallery/public/styles/max_2600x2600/public/2022-05/bmvzz3-mountains-valleys-and-lakes-of-switzerland.jpg?itok=9VCjWhWJ");

await addDestination("Austria", "https://cdn.content.tuigroup.com/adamtui/2019_10/10_16/4196212f-bf71-4928-b940-aae2010d7de9/AUS_SAA_F0093_tile.jpg");

await addDestination("Italy", "https://media.istockphoto.com/id/641205724/photo/val-dorcia-tuscany-italy.jpg?s=612x612&w=0&k=20&c=27XSZydMGm6q9yLuJ5Qqlu87jR1UBNTViSzHf3SfbWY=");

await addComment("Switzerland", "Michael Smith", "Nice natural attractions", 4);
await addComment("France", "Adam Smith", "Great attractions like the Eiffel Tower and more", 5);
await addComment("Germany", "Charlie Smith", "I love the beer and food in Germany", 5);
await addComment("Italy", "George Smith", "Too expensive for my liking", 2);
await addComment("Austria", "Charlotte Smith", "I really liked the atmosphere when i visited", 4);
await addComment("Spain", "Maddison Smith", "I really liked the food and the country is very warm and the sun makes me happy", 5);
await addComment("Spain", "Camila", "Spain is a fantastic travel destination that offers a perfect mix of history, culture, and natural beauty. Whether you're strolling through the lively streets of Madrid, marveling at Gaudí's architectural wonders in Barcelona, or soaking up the sun on the beaches of the Costa del Sol, there's something for everyone.", 5);
await addComment("Spain", "Patrick", "The food is a highlight—tapas, paella, and fresh seafood are must-tries!", 5);
await addComment("Italy", "Suzanne", "Italy is a beautiful country with a wealth of history, art, and delicious food, though it can be a bit overwhelming at times. Cities like Rome, Florence, and Venice are stunning, filled with iconic landmarks like the Colosseum, the Vatican, and the canals, but they can also be crowded and touristy. Overall, Italy is definitely worth visiting, but it's best enjoyed with some planning to avoid the crowds and tourist traps.", 4);
await addComment("France", "Steven", "France is undeniably beautiful and rich in history, but it can sometimes feel a bit overrated for some travelers. While Paris offers iconic landmarks like the Eiffel Tower and the Louvre, it’s often overcrowded and expensive. Service in tourist areas can be hit or miss, and navigating the language barrier may feel challenging if you don't speak French!", 2);
await addComment("Germany", "Emily", "Germany has its highlights, but it can sometimes feel a bit underwhelming as a travel destination. While cities like Berlin and Munich are rich in history, they lack the charm and warmth of other European hotspots. The architecture, though impressive in places, can feel stark and industrial, especially in modern areas. Customer service in restaurants and shops can be blunt, and the strict adherence to rules might feel rigid for travelers used to a more laid-back atmosphere. The weather is also a downside, often grey and rainy, which can make sightseeing less enjoyable.", 2);
await addComment("Switzerland", "Greg", "Switzerland is an absolutely amazing travel destination, offering breathtaking natural beauty and a seamless travel experience. The towering Swiss Alps, pristine lakes like Lake Geneva and Lake Lucerne, and charming towns such as Zermatt and Interlaken make it a paradise for nature lovers and adventure seekers alike. Whether you’re skiing, hiking, or simply taking in the views from a scenic train ride, Switzerlands landscapes are nothing short of spectacular.", 5);
await addComment("Spain", "Anne-Marie", "Austria is a charming destination known for its rich history, elegant cities, and stunning alpine landscapes. Vienna impresses with its imperial architecture and classical music heritage, while Salzburg offers a fairy-tale charm and is the birthplace of Mozart. For nature lovers, the Austrian Alps provide great skiing and hiking opportunities. Overall, Austria combines cultural depth with natural beauty, making it a delightful place to visit.", 5);


// wait for pool to stop
pool.end()
