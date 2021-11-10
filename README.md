# Dream Post - An online dream journal 
 
# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [dompurify](https://github.com/cure53/DOMPurify) -  Sanitizes HTML and prevents XSS attacks.
- [ejs](https://github.com/auth0/node-jsonwebtoken) - For embedding Javascript templates
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [marked](https://github.com/markedjs/marked) - For parsing markdown without caching or blocking for long periods of time
- [method-override](https://github.com/expressjs/method-override) - For using HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- [jsdom](https://github.com/jsdom/jsdom) - For parsing HTML
- [slugify](https://github.com/simov/slugify) - For slugifying Strings
- [colors](https://github.com/simov/slugify) - For getting colors in NodeJs console

# Application Structure
- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
-  `views/articles` - This directory containes our show pages for displaying

![snip_1](https://user-images.githubusercontent.com/20747118/133363031-26cd9600-a297-4e98-98c8-24c8750e1ba1.JPG)

![snip_2](https://user-images.githubusercontent.com/20747118/133363039-a2393ab3-517b-4e9d-a99b-9a3a805b81f6.JPG)

## Check out demo here: Dream Post(https://mysterious-caverns-43203.herokuapp.com/)
