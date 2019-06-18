FROM node:12.2

# Update ubuntu packages
RUN apt-get -y update

# Create service directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install

# Bundle app source
COPY . /app
RUN npm run build

EXPOSE 80
CMD [ "npm", "start" ]