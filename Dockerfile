# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /express-dockern

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing pm2 globally
# RUN npm install pm2 -g
# CMD ls -l
# Starting our application
CMD node ./bin/www

# Exposing server port
EXPOSE 3000