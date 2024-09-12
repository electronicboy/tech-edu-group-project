# tech-edu-group-project

### Client_Url

(https://travel-tech-ed-group-proj.onrender.com/)

### API_Url

(https://travel-tech-ed-group-proj-server.onrender.com/destinations)

### API EndPoints

#### GET:

- /destinations
- /destinations/`destination_id`
- /reviews/`destination_id`

#### POST

- /reviews/`destination_id`
- /reviews/`comment_id`/like

#### DELETE

- /reviews/`comment_id`

## Installation

### Client

Run `npm i` and `npm run dev`

### Server

Run `npm i` and `npm run dev`

environment-variable (add this to your `.env` file) :

`DATABASE_URL`=postgres://user:pass@host:port/schema

## Deployment

Both client and server can be deployed on render.com

### Client

Deploy as a Static site.

- Build Command: `npm install && npm run build`
- Publish directory: `dist`

### Server

Deploy as a Web Server.

- environment-variable: `DATABASE_URL`=postgres://user:pass@host:port/schema
- Build Command: `npm install`
- Start Command: `node server.js`
