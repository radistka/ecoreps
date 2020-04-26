# Create image based off of the official Node 6 image
FROM node:8

WORKDIR /app/express-server

# Install dependecies
RUN npm install -g nodemon

COPY ./express-server/package.json ./

RUN npm install

# Serve the app
CMD ["npm", "start"]

# Expose the port the app runs in
EXPOSE 3000




