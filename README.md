# tech-edu-group-project

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